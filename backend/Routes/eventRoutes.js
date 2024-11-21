import express from 'express';
import { getEvents, createEvent, getEventById, updateEvent, deleteEvent } from '../Controllers/eventController.js';

const router = express.Router();

router.get('/all', getEvents);
router.post('/create', createEvent);
router.get('/byId:id', getEventById);
router.put('/update:id', updateEvent);
router.delete('/delete:id', deleteEvent);

export default router;
