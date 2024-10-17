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
import MyComponent from './components/Mycomponent'
import PostBlog from './components/Users/PostBlog'
function App() {
  const auth = useSelector(state => state.auth)
  console.log('auth: ',auth)

  useEffect(() => {
    checkExpiry();
  }, []); 
  
function checkProtected(Component){
  if(!auth.isAuthenticated){
    return <Navigate to={'/login'}/>
  }
  else return <Component/>;
}
  return (
    <>
    <BrowserRouter>
              <Routes>
                    <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/my' element={<MyComponent/>}/>
                    <Route path='blog/:id' element={<Blogsingle/>}/>
                    <Route path='user/:id' element={<Users/>}/>
                    <Route path='signup' element={<Signup/>}/>
                    <Route path='login' element={<Login/>}/>
                    {/* protected Routes */}
                    <Route path='profile' element={checkProtected(Profile)}/>
                    <Route path='logout' element={checkProtected(Logout)}/>
                    <Route path='postBlog' element={checkProtected(PostBlog)}/>
                    </Route>
              </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
