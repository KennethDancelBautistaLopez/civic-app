import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  simulationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Simulation', required: true },
  choice: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming User model exists
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

export default Vote;
