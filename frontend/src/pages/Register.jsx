import React from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

    return (
        <div className='mx-auto flex flex-col justify-center items-center p-8 mt-30 border border-black bg-blue-100 rounded max-w-1/4'>
            <h2 className='text-3xl font-bold mb-4'>Register</h2>
            <form >
                <input className='border p-2 block mb-2' type='text' placeholder='Name' name="name" value="" />
                <input className='border p-2 block mb-2' type='email' placeholder='Email' name="email" value="" />
                <input className='border p-2 block mb-2' type='password' placeholder='Password' name="password" value="" />
                <input className='border p-2 block mb-2' type='password' placeholder='Confirm Password' name="confirm_password" value="" />
                <select className='border p-2 block mb-2' name="role" id="role" value="" >
                    <option value="">--Select Role--</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="labtech">Lab Technologist</option>
                </select>

                <button className='bg-blue-500 text-white px-4 py-2' type="submit">Register</button>
                <Link className='ml-6 hover:font-bold text-blue-600' to="/login">Login</Link>
            </form>
        </div>
    )
}

export default Register