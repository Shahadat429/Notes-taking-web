import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useEffect } from 'react';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AuthProvider = ({ children }) => {

    const [showUserLogin, setShowUserLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);

    //fetch user status and data on page load
    const fetchUser = async () => {
        console.log("Fetching user data...");
        try {
            const { data } = await axios.get("/api/user/is-auth");
            if (data.success) {
                setUser(data.user);
                console.log("User data fetched successfully:", data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);

    // Get Notes of the user
    const fetchNotes = async () => {
        try {
            const { data } = await axios.get("/api/notes/getNotes");
            if (data.success) {
                setNotes(data.notes);
            } else {
                setNotes([]);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNotes([]);
        }
    }
    useEffect(() => {
        if (user) {
            fetchNotes();
        } else {
            setNotes([]);
        }
    }, [user]);


    const userInfo = {
        axios,
        showUserLogin,
        setShowUserLogin,
        user,
        setUser,
        notes,
        setNotes,
        fetchUser
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    )
};

export default AuthProvider;