import React, { useContext } from 'react';
import Notes from '../components/Notes';
import NotesContainer from '../components/NotesContainer';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {

    const { user } = useContext(AuthContext);

    return (
        <div>
            <Notes />
            {user && <NotesContainer />}
        </div>
    );
};

export default Dashboard;