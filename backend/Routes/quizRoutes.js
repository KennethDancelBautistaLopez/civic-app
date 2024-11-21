import express from 'express';
import {
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  getQuizResults,
} from '../Controllers/quizController.js';
import { protect } from '../Middlewear/authMiddlewear.js';

const router = express.Router();

// Public Routes
router.get('/', getAllQuizzes);  // Fetch all quizzes
router.get('/:id', getQuizById);  // Fetch a specific quiz by ID

// Protected Routes
router.post('/submit', protect, submitQuiz);  // Submit quiz answers (only for logged-in users)
router.get('/results', protect, getQuizResults);  // Get quiz results for the logged-in user

export default router;
