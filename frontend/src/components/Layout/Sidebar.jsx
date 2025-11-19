import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [testOpen, setTestOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const location = useLocation();
    const menuItems = [
        { name: "Dashboard", path: "/", roles: ["admin", "doctor", "lab"] },
        { name: "Patients", path: "/patient", roles: ["admin", "doctor"] },
        {
            name: "Tests",
            path: "/tests",
            roles: ["lab"],
            subMenus: [
                { name: "Main Category", path: "/tests/main-category", roles: ["lab"] },
                { name: "Category", path: "/tests/category", roles: ["lab"] },
                { name: "Subcategory", path: "/tests/sub-category", roles: ["lab"] },
                { name: "Tests", path: "/tests/list", roles: ["lab"] },
            ]
        },
        { name: "Billing", path: "/billing", roles: ["admin", "doctor"] },
        { name: "Reports", path: "/reports", roles: ["admin", "lab", "doctor"] },
        { name: "Users", path: "/user", roles: ["admin"] },
        { name: "Settings", path: "/settings", roles: ["admin"] },
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
                        {menuItems.map(item => {
                            if (!item.roles.includes(user?.data.role)) return null; // skip unauthorized

                            // Render dropdown or normal link
                            if (item.subMenus) {
                                const isActiveParent = location.pathname.startsWith(item.path);
                                return (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => setTestOpen(!testOpen)}
                                            className={`w-full flex justify-between items-center px-3 py-2 rounded-md transition ${isActiveParent ? "bg-blue-600" : "hover:bg-gray-700"}`}
                                        >
                                            {item.name} <span>{testOpen ? "▾" : "▸"}</span>
                                        </button>

                                        <div className={`ml-3 overflow-hidden transition-all duration-300 ${testOpen ? "max-h-80" : "max-h-0"}`}>
                                            {item.subMenus.map(sub => {
                                                if (!sub.roles.includes(user?.data.role)) return null;
                                                return (
                                                    <NavLink
                                                        key={sub.name}
                                                        to={sub.path}
                                                        onClick={() => setOpen(false)}
                                                        className={({ isActive }) =>
                                                            `block px-3 py-2 text-sm rounded-md mt-1 ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
                                                        }
                                                    >
                                                        {sub.name}
                                                    </NavLink>
                                                );
                                            })}
                                        </div>
                                    </li>
                                );
                            }

                            return (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        onClick={() => {setTestOpen(false); setOpen(false)}}
                                        className={({ isActive }) =>
                                            `block px-3 py-2 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            );
                        })}

                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar