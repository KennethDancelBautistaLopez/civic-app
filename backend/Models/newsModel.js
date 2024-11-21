import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },  // Title of the news article
    content: { type: String, required: true },  // Full content of the news article
    date: { type: Date, default: Date.now },  // Date the article was published
    source: { type: String, required: true },  // Source of the news (e.g., news website or agency)
    url: { type: String },  // URL to the full article (optional)
    category: { type: String, enum: ['Politics', 'Economy', 'Social', 'International'], default: 'Politics' },  // Category of the news article
  },
  { timestamps: true }
);

const News = mongoose.model('News', newsSchema);

export default News;
