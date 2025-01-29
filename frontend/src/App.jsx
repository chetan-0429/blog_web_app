import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import axios from 'axios'
import {Routes,BrowserRouter,Route,Navigate} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home/Home'
import Users from './components/Users/Users'
import Blogcard from './components/Home/Blogcard'
import Blogsingle from './components/Home/Blogsingle'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import store from './store/store'
import { useSelector,useDispatch } from 'react-redux'
import checkExpiry from './components/utils/checkToken'
import Profile from './components/Users/Profile'
import Logout from './components/Auth/Logout'
import PostBlog from './components/Users/PostBlog'
import MyBlog from './components/Users/MyBlog'
import Edit from './components/Users/Edit'

function App() {
  const auth = useSelector(state => state.auth)
  const { isAuthenticated,user } = useSelector((state) => state.auth);
  console.log('auth: ',auth)

  useEffect(() => {
    checkExpiry();
  }, []); 
  

  function ProtectedRoute({ element }) {
    return isAuthenticated ? element : <Navigate to="/login" />;
  }

  return (
  
    <BrowserRouter>
              <Routes>
                    <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/blog/:id' element={<Blogsingle/>}/>
                    <Route path='/user/:id' element={<Users/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/login' element={<Login/>}/>
                    {/* protected Routes */}
                    <Route path="/profile" element={ < ProtectedRoute element={< Profile/>} /> } />
                    <Route path='/logout' element={ < ProtectedRoute element={< Logout/>} /> }/>
                    {/* <Route path='/logout' element={ProtectedRoute(Logout)}/> */}
                    <Route path='/postBlog' element={ < ProtectedRoute element={< PostBlog/>} /> } />
                    <Route path='/my-blog' element={ < ProtectedRoute element={< MyBlog/>} /> }/>
                    <Route path='/edit/:id' element={ < ProtectedRoute element={< Edit/>} /> }/>
                    </Route>
              </Routes>
      </BrowserRouter>

  )
}

export default App
