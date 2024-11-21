import mongoose from 'mongoose';

const simulationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  options: [{ type: String, required: true }], // List of choices for the simulation
}, { timestamps: true });

const Simulation = mongoose.model('Simulation', simulationSchema);

export default Simulation;
