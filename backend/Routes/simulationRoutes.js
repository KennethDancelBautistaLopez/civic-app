import express from 'express';
import {
  getSimulations,
  getSimulationById,
  createSimulation,
  submitVote,
  getSimulationResults,
} from '../Controllers/simulationController.js';
import { protect, isAdmin } from '../Middlewear/authMiddlewear.js';


const router = express.Router();

// Public Routes
router.get('/get', getSimulations);  // Fetch all simulations
router.get('/getById/:id', getSimulationById);  // Fetch a simulation by ID
router.get('/results/:id', getSimulationResults);  // Fetch simulation results by ID

// Admin Routes
router.post('/create', protect, isAdmin, createSimulation);  // Admin-only route to create simulations

// User Routes
router.post('/vote', protect, submitVote);  // Submit a vote (make it protected if only logged-in users should vote)

export default router;
