import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);

export default Result;
