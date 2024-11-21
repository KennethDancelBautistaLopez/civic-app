import Content from '../Models/content.js';

// Get all content
export const getAllContent = async (req, res) => {
  try {
    const content = await Content.find();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving content', error });
  }
};

// Get content by ID
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving content', error });
  }
};

// Create new content (Admin function)
export const createContent = async (req, res) => {
  try {
    const { title, description, section } = req.body;

    // Basic validation
    if (!title || !description || !section) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContent = new Content({
      title,
      description,
      section,
    });

    await newContent.save();
    res.status(201).json({ message: 'Content created successfully', content: newContent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error });
  }
};

// Update content by ID (Admin function)
export const updateContent = async (req, res) => {
  try {
    const { title, description, section } = req.body;

    // Find content by ID and update
    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      { title, description, section },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content updated successfully', content: updatedContent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error });
  }
};

// Delete content by ID (Admin function)
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content', error });
  }
};
