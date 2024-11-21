import Simulation from '../models/simulationModel.js';
import Vote from '../models/voteModel.js';

// Fetch all simulations
export const getSimulations = async (req, res) => {
  try {
    const simulations = await Simulation.find();
    res.status(200).json(simulations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving simulations', error });
  }
};

// Fetch a specific simulation by ID
export const getSimulationById = async (req, res) => {
  try {
    const simulation = await Simulation.findById(req.params.id);
    if (!simulation) {
      return res.status(404).json({ message: 'Simulation not found' });
    }
    res.status(200).json(simulation);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving simulation', error });
  }
};

// Admin: Create a new simulation
export const createSimulation = async (req, res) => {
  try {
    const { title, description, options } = req.body;

    if (!Array.isArray(options) || options.some(option => typeof option !== 'string')) {
      return res.status(400).json({ message: 'Options should be an array of strings' });
    }

    const newSimulation = new Simulation({ title, description, options });
    await newSimulation.save();
    res.status(201).json({ message: 'Simulation created successfully', simulation: newSimulation });
  } catch (error) {
    res.status(500).json({ message: 'Error creating simulation', error });
  }
};

// User: Submit a vote
export const submitVote = async (req, res) => {
  try {
    const { simulationId, choice } = req.body;

    // Check if the simulation exists
    const simulation = await Simulation.findById(simulationId);
    if (!simulation) {
      return res.status(404).json({ message: 'Simulation not found' });
    }

    // Save the vote
    const newVote = new Vote({ simulationId, choice, user: req.user.id });
    await newVote.save();

    res.status(200).json({ message: 'Vote submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting vote', error });
  }
};

// Fetch simulation results (e.g., voting results)
export const getSimulationResults = async (req, res) => {
  try {
    const simulationId = req.params.id;

    // Count votes for each choice
    const votes = await Vote.aggregate([
      { $match: { simulationId } },
      { $group: { _id: '$choice', count: { $sum: 1 } } }
    ]);

    res.status(200).json({ simulationId, results: votes });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving simulation results', error });
  }
};
