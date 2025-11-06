import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from "../api/api";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await api.post("/user/login", { email, password });
        const user = res.data;
        login(user, user.data.token);
        navigate("/");
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    }

  return (
    <div className='mx-auto flex flex-col justify-center items-center p-8 mt-35 border border-black bg-blue-100 rounded max-w-1/4'>
        <h2 className='text-3xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
            <input className='border p-2 block mb-2' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='border p-2 block mb-2' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className='bg-blue-500 text-white px-4 py-2' type="submit">Login</button>
            <Link className='ml-6 hover:font-bold text-blue-600 underline' to="/register">Register</Link>
        </form>
    </div>
  )
}

export default Login