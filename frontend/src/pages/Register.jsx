import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import api from "../api/api"

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        role: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password || !formData.role) {
            console.log("All fields are required, including role.");
            return;
        }

        if (formData.password !== formData.confirm_password) {
            console.log("Passwords do not match.");
            return;
        }

        try {
            const res = await api.post("/user/create", formData);
            setFormData({
                name: "",
                email: "",
                password: "",
                confirm_password: "",
                role: "",
            })

        } catch (error) {
            
        }
    };

    return (
        <div className='mx-auto flex flex-col justify-center items-center p-8 mt-30 border border-black bg-blue-100 rounded max-w-1/4'>
            <h2 className='text-3xl font-bold mb-4'>Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='border p-2 block mb-2' type='text' placeholder='Name' name="name" value={formData.name} onChange={handleChange} />
                <input className='border p-2 block mb-2' type='email' placeholder='Email' name="email" value={formData.email} onChange={handleChange} />
                <input className='border p-2 block mb-2' type='password' placeholder='Password' name="password" value={formData.password} onChange={handleChange} />
                <input className='border p-2 block mb-2' type='password' placeholder='Confirm Password' name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
                <select className='border p-2 block mb-2' name="role" id="role" value={formData.role} onChange={handleChange}>
                    <option value="">--Select Role--</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="labtech">Lab Technologist</option>
                </select>

                <button className='bg-blue-500 text-white px-4 py-2' type="submit">Register</button>
                <Link className='ml-6 hover:font-bold text-blue-600 underline' to="/login">Login</Link>
            </form>
        </div>
    )
}

export default Register