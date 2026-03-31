import React, { useContext } from 'react';
import SNotes from '../../public/s_notes.png';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router';

const Navbar = () => {

    const { showUserLogin, setShowUserLogin, user, setUser, axios } = useContext(AuthContext);

    const logout = async() => {
        try {
            const { data } = await axios.post("/api/user/logout");
            if(data.success) {
                setUser(null);
                setShowUserLogin(false);
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <div className='flex items-center'>
                        <img className='w-10 h-10' src={SNotes} alt="S Notes" />
                        <a className="btn btn-ghost text-xl">Shahadat Notes</a>
                        {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-[400px] bg-gray-200 h-auto md:h-13 ml-10 border-none outline-none" /> */}
                    </div>
                </div>
                <div className="flex gap-2">

                    {user ?
                        (<div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><button onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                        ) : (
                            <button
                                onClick={() => setShowUserLogin(true)}
                                className='btn btn-soft btn-info'
                            >
                                Login
                            </button>
                        )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;