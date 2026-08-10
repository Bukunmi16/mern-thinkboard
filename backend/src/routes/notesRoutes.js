import express from 'express';
import {getNotes, searchNote, createNote, updateNote, deleteNote} from '../controllers/noteControllers.js';

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', searchNote);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);


export default router;