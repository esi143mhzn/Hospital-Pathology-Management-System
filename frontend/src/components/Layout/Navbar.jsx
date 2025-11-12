import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { matchPath, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    if(!user) return null;

    const routesMap = [
        { path: "/", label: "Dashboard"},
        { path: "/patients/*", label: "Patients"},
        { path: "/tests/*", label: "Tests"},
        { path: "/billing/*", label: "Billing"},
        { path: "/reports/*", label: "Reports"},
        { path: "/user/*", label: "Users"},
        { path: "/settings/*", label: "Settings"},
    ];

    const title = routesMap.find((r) => matchPath(r.path, location.pathname)) ?.label || "Dashboard";

  return (
    <header className='bg-white shadow p-4 flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <div className='flex items-center gap-4'>
            <span className='text-gray-600'>Welcome, {user.data?.name}</span>
            <div className="flex items-center gap-2">
                <button onClick={logout} className='bg-red-200 px-3 py-1 rounded hover:cursor-pointer hover:bg-red-300 transition duration-200'>Logout</button>
            </div>
        </div>
    </header>
  ) 
}

export default Navbar