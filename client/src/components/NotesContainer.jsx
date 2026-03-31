import { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const NotesContainer = () => {

    const { notes, setNotes, axios, user } = useContext(AuthContext);

    const [activeNote, setActiveNote] = useState(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);

    const openNote = (note) => setActiveNote(note);

    const handleSave = async (updatedNote) => {
        try {
            const { data } = await axios.put(`/api/notes/updateNote/${updatedNote._id}`, {
                title: updatedNote.title,
                notesText: updatedNote.text
            });
            if (data.success) {
                setNotes((prev) => {
                    const filteredNotes = prev.filter(n => n._id !== updatedNote._id);
                    return [data.note, ...filteredNotes];
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred while saving the note.");
        }
    };

    // Move cursor to end when overlay opens
    useEffect(() => {
        if (activeNote && titleRef.current) {
            const el = titleRef.current;
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
        }
    }, [activeNote?.id]);

    // Just closes the overlay without saving
    const handleClose = () => {
        handleSave(activeNote); // Save changes before closing
        setActiveNote(null);  // Hide the overlay
    };

    // When clicking outside, save and close
    const handleOverlayClick = async () => {
        if (activeNote) {
            await handleSave(activeNote); // Save first
            setActiveNote(null);          // Then close overlay
        }
    };

    // Auto-resize textareas
    const autoResize = (el) => {
        if (el) {
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
        }
    };

    useEffect(() => {
        autoResize(titleRef.current);
        autoResize(textRef.current);
    }, [activeNote?.title, activeNote?.text]);

    return (
        <div className="p-2 sm:p-6">

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-2 w-full">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        onClick={() => openNote(note)}
                        className="break-inside-avoid mb-4 cursor-pointer rounded-xl border bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition"
                    >

                        <h3 className="whitespace-pre-wrap break-words font-bold text-base sm:text-lg md:text-xl text-gray-900 mb-1 sm:mb-2">
                            {note.title || ""}
                        </h3>

                        <p className="whitespace-pre-wrap break-words text-sm sm:text-base text-gray-800">
                            {note.text || ""}
                        </p>
                    </div>
                ))}
            </div>

            {/* Overlay */}
            {activeNote && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center p-2 sm:p-4 z-50"
                    onClick={handleOverlayClick}
                >
                    <div
                        className="bg-white w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-xl p-4 sm:p-6 shadow-lg flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <textarea
                            ref={titleRef}
                            type="text"
                            value={activeNote.title}
                            onChange={(e) =>
                                setActiveNote(prev => ({ ...prev, title: e.target.value }))
                            }
                            // onInput={(e) => autoResize(e.target)}
                            placeholder="Title"
                            className="w-full outline-none border-b mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-gray-900 resize-none overflow-hidden"
                        />
                        <textarea
                            ref={textRef}
                            value={activeNote.text}
                            onChange={(e) =>
                                setActiveNote(prev => ({ ...prev, text: e.target.value }))
                            }
                            // onInput={(e) => autoResize(e.target)}
                            placeholder="Take a note..."
                            className="w-full outline-none text-gray-800 resize-none overflow-hidden text-sm sm:text-base h-auto break-words"
                        />
                        <div className="flex justify-end mt-3">
                            <button
                                onClick={() => handleClose()}
                                className="px-4 py-1 rounded-md hover:bg-gray-100 text-sm sm:text-base"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotesContainer;