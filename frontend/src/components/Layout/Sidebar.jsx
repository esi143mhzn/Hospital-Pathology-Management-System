import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const menuItems = [
        { name: "Dashboard", path: "/" },
        { name: "Patients", path: "/patient" },
        { name: "Tests", path: "/tests" },
        { name: "Billing", path: "/billing" },
        { name: "Reports", path: "/reports" },
        { name: "Users", path: "/user" },
        { name: "Settings", path: "/settings" },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button onClick={() => setOpen(!open)} className='md:hidden p-3 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-md'>{open ? "✖" : "☰"}</button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 bg-gray-900 h-full text-white w-64 p-5 transition-transform transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-40`} >
                <h1 className='text-2xl font-bold mb-8'>HPMS</h1>
                <nav>
                    <ul className='space-y-3'>
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <NavLink to={item.path} onClick={() => setOpen(false)} className={({isActive}) => `block px-3 py-2 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar