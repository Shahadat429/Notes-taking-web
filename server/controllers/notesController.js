import Notes from "../models/notes.js";
import { decrypt, encrypt } from "../utils/crypto.js";


// Create a new note: /api/notes/createNotes
export const createNote = async (req, res) => {
    try {
        const { title, text } = req.body;
        // if (!title && !notesText) {
        //     return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        // }
        // TODO : save note to database
        const newNote = new Notes({
            title: encrypt((title || "").trim()),
            text: encrypt((text || "").trim()),
            userId: req.userId
        });
        await newNote.save();
        res.status(201).json({
            success: true,
            note: {
                ...newNote.toObject(),
                title: decrypt(newNote.title),
                text: decrypt(newNote.text)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get all notes of a user : /api/notes/getNotes
export const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ userId: req.userId }).sort({ createdAt: -1 });

        const decryptedNotes = notes.map(note => ({
            ...note.toObject(),
            title: decrypt(note.title),
            text: decrypt(note.text)
        }));

        res.status(200).json({ success: true, notes: decryptedNotes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update a note : /api/notes/updateNote/:id
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text } = req.body;

        const note = await Notes.findOne({ _id: id, userId: req.userId });
        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        if (title !== undefined) note.title = encrypt((title || "").trim());
        if (text !== undefined) note.text = encrypt((text || "").trim());

        // await note.save();
        // res.json({ success: true, note });

        await note.save();
        res.json({ 
            success: true, 
            note: {
                ...note.toObject(),
                title: decrypt(note.title),
                text: decrypt(note.text)
            }
         });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}