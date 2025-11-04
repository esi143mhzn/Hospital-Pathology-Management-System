import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  return (
    <div className='mx-auto flex flex-col justify-center items-center p-8 mt-35 border border-black bg-blue-100 rounded max-w-1/4'>
        <h2 className='text-3xl font-bold mb-4'>Login</h2>
        <form>
            <input className='border p-2 block mb-2' type='email' placeholder='Email' value="" />
            <input className='border p-2 block mb-2' type='password' placeholder='Password' value="" />
            <button className='bg-blue-500 text-white px-4 py-2' type="submit">Login</button>
            <Link className='ml-6 hover:font-bold text-blue-600' to="/register">Register</Link>
        </form>
    </div>
  )
}

export default Login