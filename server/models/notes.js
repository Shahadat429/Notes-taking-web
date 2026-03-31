import { text } from "express";
import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Notes = mongoose.models.Notes || mongoose.model('Notes', notesSchema);

export default Notes;
