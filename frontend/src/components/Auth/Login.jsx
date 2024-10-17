import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { getUrl } from '../../action';
import Cookies from 'js-cookie';
import { login } from '../../slices/authSlice';
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Login() {
  console.log('login')
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate()
    useEffect(()=>{
      if(auth.isAuthenticated) {
        navigate('/');
      }
    },[auth.isAuthenticated,navigate])

     function handleClick(e){
      e.preventDefault();
        console.log('clicked: ')
        dispatch(login({username,password}));
        console.log('clicked: checking for is auth',auth.isAuthenticated)
    }
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {/* Username Field */}
      <div className="mb-4 flex items-center space-x-4">
        <label className="w-1/4 text-sm font-medium text-gray-700">Username</label>
        <input 
          type="text" 
          placeholder="Enter username"
          className="w-3/4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Password Field */}
      <div className="mb-6 flex items-center space-x-4">
        <label className="w-1/4 text-sm font-medium text-gray-700">Password</label>
        <input 
          type="password" 
          placeholder="Enter password"
          className="w-3/4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleClick} 
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
        Submit
      </button>
    </div>
  </div>
  )
}

export default Login