import express from 'express';
import { createNote, getNotes, updateNote } from '../controllers/notesController.js';
import authUser from '../middlewears/authUser.js';

const notesRoutes = express.Router();

notesRoutes.post('/createNotes', authUser, createNote);
notesRoutes.get('/getNotes', authUser, getNotes);
notesRoutes.put('/updateNote/:id', authUser, updateNote);
 
export default notesRoutes;