import Notes from "../models/notes.js";


// Create a new note: /api/notes/createNotes
export const createNote = async (req, res) => {
    try {
        const { title, notesText } = req.body;
        // if (!title && !notesText) {
        //     return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        // }
        // TODO : save note to database
        const newNote = new Notes({
            title: title || "",
            text: notesText || "",
            userId: req.userId
        });
        await newNote.save();
        res.status(201).json({ success: true, note: newNote });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get all notes of a user : /api/notes/getNotes
export const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update a note : /api/notes/updateNote/:id
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, notesText } = req.body;

        const note = await Notes.findOne({ _id: id, userId: req.userId });
        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        if (title !== undefined) note.title = title;
        if (notesText !== undefined) note.text = notesText;

        await note.save();
        res.json({ success: true, note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}