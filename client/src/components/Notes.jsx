import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Notes = () => {

    const { user, setShowUserLogin, setNotes, axios } = useContext(AuthContext);
    const [notesText, setNotesText] = useState('');
    const [title, setTitle] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const wrapperRef = useRef(null);
    const titleRef = useRef(null);
    const notesRef = useRef(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        autoResize(titleRef.current);
    }

    const handleNotesChange = (e) => {
        setNotesText(e.target.value);
        autoResize(notesRef.current);
    }

    const handleBlur = async (e) => {
        if (!wrapperRef.current.contains(e.relatedTarget || document.body)) {

            if (!user) {
                setNotesText('');
                setTitle('');
                toast.error("Please login first");
                setShowUserLogin(true);
                return;
            }

            // prevent empty note
            // if (!title.trim() && !notesText.trim()) {
            //     setIsFocused(false);
            //     return;
            // }

            try {
                const { data } = await axios.post("/api/notes/createNotes", {
                    title: title.trim(),
                    notesText: notesText.trim()
                });
                if (data.success) {
                    toast.success(data.message);
                    setNotes((prev) => [ data.note , ...prev]);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error("An error occurred while creating the note.");
            } finally {
                setIsFocused(false);
                setNotesText('');
                setTitle('');
            }
        }
    };

    const autoResize = (ta) => {
        // const ta = textAreaRef.current;
        if (ta) {
            ta.style.height = 'auto'; // reset height
            ta.style.height = ta.scrollHeight + 'px'; // expand to fit content
        }
    };


    useEffect(() => {
        if (isFocused) {
            autoResize(titleRef.current);
            autoResize(notesRef.current);
        }
    }, [isFocused])

    return (
        <div className='flex justify-center p-10'>
            <div
                onBlur={handleBlur}
                onFocus={() => setIsFocused(true)}
                ref={wrapperRef}
                tabIndex={0}
                className={`flex flex-col w-auto md:w-100 p-4 rounded-lg transition-all duration-200
                border border-gray-300
                ${isFocused ? 'shadow-lg' : 'shadow-md'}`}>


                {isFocused && (
                    <textarea
                        ref={titleRef}
                        value={title}
                        name='title'
                        onChange={handleTitleChange}
                        type="text"
                        placeholder="Title"
                        className="w-full outline-none border-none h-10 pb-6 text-xl font-bold text-gray-900 resize-none overflow-hidden"
                        rows={1}
                    />
                )}

                <textarea
                    ref={notesRef}
                    value={notesText}
                    name='notes'
                    onChange={handleNotesChange}
                    placeholder="Take a note..."
                    className="w-full outline-none border-none overflow-hidden resize-none"
                    rows={1}
                />



            </div>

        </div>
    );
};

export default Notes;