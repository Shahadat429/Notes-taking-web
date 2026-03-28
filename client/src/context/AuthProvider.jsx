import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const AuthProvider = ({ children }) => {

    const [showUserLogin, setShowUserLogin] = useState(false);
    const [user, setUser] = useState(true);
    const [notes, setNotes] = useState([
        { id: 1, title: "First Note", text: "This is a sample note." },
        { id: 2, title: "Address", text: "AAAAAA\nAddress line..." }
    ]);

    const userInfo = {
        axios,
        showUserLogin,
        setShowUserLogin,
        user,
        setUser,
        notes,
        setNotes
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    )
};

export default AuthProvider;