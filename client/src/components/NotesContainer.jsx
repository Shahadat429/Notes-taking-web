import { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const NotesContainer = () => {

    const { notes, setNotes } = useContext(AuthContext);

    const [activeNote, setActiveNote] = useState(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);

    const openNote = (note) => setActiveNote(note);

    const handleSave = (updatedNote) => {
        const filteredNotes = notes.filter(n => n.id !== updatedNote.id);
        setNotes([updatedNote, ...filteredNotes]);
        setActiveNote(null);
    };

    // Move cursor to end when overlay opens
    useEffect(() => {
        if (activeNote && titleRef.current) {
            const el = titleRef.current;
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
        }
    }, [activeNote?.id]); // 👈 only when note opens

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
            <div className="columns-1 md:columns-3 lg:columns-4 gap-4 w-auto">
                {notes.map(note => (
                    <div
                        key={note.id}
                        onClick={() => openNote(note)}
                        className="break-inside-avoid mb-4 cursor-pointer rounded-xl border bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition"
                    >
                        {note.title && (
                            <h3 className="whitespace-pre-wrap break-words font-bold text-base sm:text-lg md:text-xl text-gray-900 mb-1 sm:mb-2">
                                {note.title}
                            </h3>
                        )}
                        <p className="whitespace-pre-wrap break-words text-sm sm:text-base text-gray-800">
                            {note.text || "Empty note"}
                        </p>
                    </div>
                ))}
            </div>

            {/* Overlay */}
            {activeNote && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center p-2 sm:p-4 z-50"
                    onClick={() => handleSave(activeNote)}
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
                                onClick={() => handleSave(activeNote)}
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