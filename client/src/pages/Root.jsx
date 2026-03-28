import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Login';

const Root = () => {

    const { showUserLogin } = useContext(AuthContext);

    return (
        <div>
            <Navbar />
            <Outlet />
            { showUserLogin ? <Login /> : null }
        </div>
    );
};

export default Root;    