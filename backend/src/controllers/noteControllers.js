import Note from '../models/Node.js';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notes', error });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({title, content});
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({ message: 'Error creating note', error });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: 'Error updating note', error });
    };
};

export const deleteNote = (req, res) => {
    res.status(200).json({ message: 'Note deleted successfully!' });
};