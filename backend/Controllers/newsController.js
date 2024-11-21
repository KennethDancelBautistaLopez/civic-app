import News from '../models/newsModel.js';
import axios from 'axios';

// Fetch the latest news articles from the database
export const getLatestNews = async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 }).limit(5);  // Get the latest 5 articles
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving news', error });
  }
};

// Fetch a specific news article by ID
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving news article', error });
  }
};

// Admin: Create a new news article
export const createNews = async (req, res) => {
  const { title, content, source, date } = req.body;
  if (!title || !content || !source || !date) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newNews = new News({
      title,
      content,
      source,
      date,
    });

    await newNews.save();
    res.status(201).json({
      message: 'News article created successfully',
      news: newNews,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating news article', error });
  }
};

// Admin: Update an existing news article
export const updateNews = async (req, res) => {
  const { title, content, source, date } = req.body;
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    news.title = title || news.title;
    news.content = content || news.content;
    news.source = source || news.source;
    news.date = date || news.date;

    await news.save();

    res.status(200).json({
      message: 'News article updated successfully',
      news,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating news article', error });
  }
};

// Admin: Delete a news article
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    await news.remove();

    res.status(200).json({
      message: 'News article deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting news article', error });
  }
};

// Fetch external news from a third-party API (e.g., NewsAPI)
export const fetchExternalNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'ph',
        category: 'politics',
        apiKey: 'YOUR_API_KEY',
      },
    });
    res.status(200).json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching external news', error });
  }
};
