import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from "../api/api";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await api.post("/user/login", { email, password });
        const user = res.data;
        login(user, user.data.token);
        navigate("/");
      } catch (error) {
        setError(error.response?.data?.message || "Login failed");
      }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
      <div className='bg-white shadow-lg rounded-2xl p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>Hospital Pathology Management System</h1>
        <h2 className='text-lg font-semibold text-gray-700 text-center mb-6'>Login to your account</h2>
        {error && (
          <p className="text-red-500 bg-red-100 p-2 text-center rounded mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='block text-gray-700 mb-1'>
            <label htmlFor="">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none' required/>
          </div>
          <div className='block text-gray-700 mb-1'>
            <label htmlFor="">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none' required/>
          </div>
          <button className='bg-blue-600 py-3 w-full hover:bg-blue-700 text-white rounded-md font-semibold transition'>Login</button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          © {new Date().getFullYear()} Hospital Pathology Management System
        </p>

      </div>
    </div>
  )
}

export default Login