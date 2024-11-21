import mongoose from 'mongoose';

// Engagement Schema to track user activities
const engagementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },  // Track quizzes
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },  // Track topics
  actionType: { type: String, required: true },  // E.g., 'quiz_taken', 'topic_viewed', 'vote_cast'
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

const Engagement = mongoose.model('Engagement', engagementSchema);

export default Engagement;
