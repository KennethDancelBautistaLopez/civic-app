import express from 'express';
import { getAllContent, getContentById, createContent, updateContent, deleteContent } from '../Controllers/contentController.js';

const router = express.Router();

router.get('/all', getAllContent);
router.get('/byId:id', getContentById);
router.post('/create', createContent);
router.put('/update:id', updateContent);
router.delete('/delete:id', deleteContent);

export default router;
