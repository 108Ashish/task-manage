import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
const [values, setValues] = useState({
    
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post('http://localhost:1000/api/v1/login', values,
            {
                withCredentials: true,

            }
        );
        if (res.status === 200) {
            localStorage.setItem("userLoggedIn", "yes");
            navigate('/dashboard');
          } else {
            console.error("Login failed:", res.data);
          }} catch (error) {
      console.error(error.response?.data || 'Registration failed')
    }
  }



  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[85vw] md:w-[60vw] lg:w-[35vw]">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">Welcome Back</h1>
        <h3 className="text-center text-gray-600 mb-6">Login to your Task Manager account</h3>

        <form method="post" className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="border rounded-lg px-4 py-2 border-zinc-300 w-full outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="border rounded-lg px-4 py-2 border-zinc-300 w-full outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300"
         onClick={ handleLogin}>
            Login
          </button>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
