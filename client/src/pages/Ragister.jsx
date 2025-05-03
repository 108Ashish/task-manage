import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Ragister = () => {  // Changed to match file name
  const [values, setValues] = useState({
    username: '',
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

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post('http://localhost:1000/api/v1/register', values)
        alert('Registration successful', res.data.success)
        navigate('/login'); 
    } catch (error) {
      console.error(error.response?.data || 'Registration failed')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[85vw] md:w-[60vw] lg:w-[35vw]">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">Task Manager</h1>
        <h3 className="text-center text-gray-600 mb-6">Manage all your tasks in one place!</h3>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            required
            placeholder="Username"
            className="border rounded-lg px-4 py-2 border-zinc-300 w-full outline-none focus:border-blue-500"
          />

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
          onClick={handleRegister}>
            Register
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Ragister  // Changed to match component name