import express from 'express';
import {
  getUserEngagement,
  getTopicEngagement,
  getQuizEngagement,
  getVoteEngagement,
} from '../Controllers/analyticsController.js';
import { protect } from '../Middlewear/authMiddlewear.js';

const router = express.Router();

// Public Routes (analytics can be public or restricted based on user roles)
router.get('/user-engagement', protect, getUserEngagement);  // Fetch user engagement data
router.get('/topic-engagement', protect, getTopicEngagement);  // Fetch topic engagement data
router.get('/quiz-engagement/:quizId', protect, getQuizEngagement);  // Fetch quiz engagement data for a specific quiz
router.get('/vote-engagement', protect, getVoteEngagement);  // Track voting participation

export default router;
