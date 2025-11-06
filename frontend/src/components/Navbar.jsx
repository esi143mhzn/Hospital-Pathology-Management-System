import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    if(!user) return null;

  return (
    <nav className='flex justify-between p-4 bg-blue-200'>
        <div>
            <Link to="/" className='mr-4'>Dashboard</Link>
            {(user.data.role === "admin" || user.data.role === "doctor") && <Link to="/user" className='mr-4'>Users</Link>}
            
        </div>

        {user ? (
            <div className='flex items-center gap-4'>
                 <span className='font-semibold'>Hello, {user.data?.name}</span>
                 <button onClick={logout} className='bg-red-200 px-3 py-1 rounded hover:cursor-pointer hover:bg-red-300 transition duration-200'>Logout</button>
            </div>
        ) : (
            <Link to="/login">Login</Link>
        )
        }
    </nav>
  )
}

export default Navbar