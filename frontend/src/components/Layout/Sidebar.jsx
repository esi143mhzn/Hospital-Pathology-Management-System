import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [testOpen, setTestOpen] = useState(false);

    const location = useLocation();
    const menuItems = [
        { name: "Dashboard", path: "/" },
        { name: "Patients", path: "/patient" },
        { name: "Tests", path: "" },
        { name: "Billing", path: "/billing" },
        { name: "Reports", path: "/reports" },
        { name: "Users", path: "/user" },
        { name: "Settings", path: "/settings" },
    ];

    useEffect(() => {
        if (location.pathname.startsWith("/tests")) {
            setTestOpen(true);
        }
    }, [location.pathname]);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button onClick={() => setOpen(!open)} className='md:hidden p-3 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-md'>{open ? "✖" : "☰"}</button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 bg-gray-900 h-full text-white w-64 p-5 transition-transform transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-40`} >
                <h1 className='text-2xl font-bold mb-8'>HPMS</h1>
                <nav>
                    <ul className='space-y-3'>
                        {menuItems.slice(0, 2).map((item) => (
                            <li key={item.name}>
                                <NavLink to={item.path} onClick={() => { setTestOpen(false); setOpen(false) }} className={({ isActive }) => `block px-3 py-2 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>{item.name}</NavLink>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => setTestOpen(!testOpen)}
                                className={`w-full flex justify-between items-center px-3 py-2 rounded-md transition ${location.pathname.startsWith("/tests") ? "bg-blue-600" : "hover:bg-gray-700"}`}
                            >
                                <span>Tests</span>
                                <span>{testOpen ? "▾" : "▸"}</span>
                            </button>

                            <div
                                className={`ml-3 overflow-hidden transition-all duration-300 ${testOpen ? "max-h-80" : "max-h-0"
                                    }`}
                            >
                                <NavLink
                                    to="/tests/main-category"
                                    onClick={() => setOpen(false)}
                                    className={`block px-3 py-2 text-sm rounded-md mt-1 ${location.pathname === "/tests/main-category"
                                            ? "bg-blue-600"
                                            : "hover:bg-gray-700"
                                        }`}
                                >
                                    Main Category
                                </NavLink>

                                <NavLink
                                    to="/tests/category"
                                    onClick={() => setOpen(false)}
                                    className={`block px-3 py-2 text-sm rounded-md mt-1 ${location.pathname === "/tests/category"
                                            ? "bg-blue-600"
                                            : "hover:bg-gray-700"
                                        }`}
                                >
                                    Category
                                </NavLink>

                                <NavLink
                                    to="/tests/sub-category"
                                    onClick={() => setOpen(false)}
                                    className={`block px-3 py-2 text-sm rounded-md mt-1 ${location.pathname === "/tests/sub-category"
                                            ? "bg-blue-600"
                                            : "hover:bg-gray-700"
                                        }`}
                                >
                                    Sub Category
                                </NavLink>

                                <NavLink
                                    to="/tests"
                                    onClick={() => setOpen(false)}
                                    className={`block px-3 py-2 text-sm rounded-md mt-1 ${location.pathname === "/tests"
                                            ? "bg-blue-600"
                                            : "hover:bg-gray-700"
                                        }`}
                                >
                                    Tests
                                </NavLink>
                            </div>
                        </li>

                        {menuItems.slice(3).map((item) => (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => { setTestOpen(false); setOpen(false) }}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar