import express from 'express';
import {
  getLatestNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  fetchExternalNews,
} from '../Controllers/newsController.js';
import { protect, isAdmin } from '../Middlewear/authMiddlewear.js';

const router = express.Router();

// Public Routes
router.get('/latest', getLatestNews); // Get the latest news articles
router.get('/external', fetchExternalNews); // Get external news from API
router.get('/:id', getNewsById); // Get a specific news article by ID

// Admin Routes
router.post('/', protect, isAdmin, createNews); // Admin: Create news
router.put('/:id', protect, isAdmin, updateNews); // Admin: Update news article
router.delete('/:id', protect, isAdmin, deleteNews); // Admin: Delete news article

export default router;
