import React, {useState} from 'react'
import axios from 'axios'
import { getUrl } from '../../action';
import Cookies from 'js-cookie';

function Signup() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');

    // async function handleClick(){
    //     const data = {name,username,password};
    //     try{
    //       let res = await fetch('api/users/signup',{
    //         method:"POST",
    //         headers:{"content-type":"application/json"},
    //         body:JSON.strignify(data)
    //       })
    //        res = await res.json();
    //        console.log(res);
    //     }catch(err){
    //       console.log('error in creating',err);
    //     }
    // }
    async function handleClick(){
        const data = {name,username,password};
        try{
          let res = await axios.post(getUrl('/users/signup/'),data);
           console.log(res);
           console.log(res.data);
           if(res.data.success){
            let token = res.data.token;
            console.log('cookies set');
        }
        }catch(err){
          console.log('error in creating',err);
        }
    }
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

      {/* Name Field */}
      <div className="mb-4 flex items-center space-x-4">
        <label className="w-1/4 text-sm font-medium text-gray-700">Name</label>
        <input 
          type="text" 
          placeholder="Enter your name"
          className="w-3/4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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

export default Signup