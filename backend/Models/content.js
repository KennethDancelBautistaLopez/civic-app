import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

export default Content; // Use ES6 export
