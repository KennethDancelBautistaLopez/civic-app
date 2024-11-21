import mongoose from 'mongoose';

// Question Schema
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

// Ensuring the correctAnswer is one of the options
questionSchema.pre('save', function(next) {
  if (!this.options.includes(this.correctAnswer)) {
    return next(new Error('The correct answer must be one of the options.'));
  }
  next();
});

// Quiz Schema
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [questionSchema], // List of questions in the quiz
}, { timestamps: true });

// Optionally, add indexing if needed
quizSchema.index({ title: 1 });
quizSchema.index({ description: 'text' });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
