import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Navigate,Link} from 'react-router-dom'
import Blogcard from './Blogcard';
import { getUrl } from '../../action';

function Home() {
  const [blogs,setBlogs] = useState([]);
  async function  fetchBlogs(){
    try{
      const res = await axios.get(getUrl('/blogs'));
      console.log('response is : ',res)
      if(res.data.success){
        setBlogs(res.data.blogs);
      }
    }catch(err){
      console.log('error in getting blogs',err)
    }
  }

  useEffect(()=>{
    fetchBlogs();
  },[])


  return (
    <>
  <div className="container mx-auto p-4">
    <h2 className="text-3xl font-bold mb-6"></h2>
    {console.log('len', blogs.length)}
    {blogs.length === 0 ? (
      <p className="text-center text-gray-500">No blogs available.</p>
    ) : (
      blogs.map(blog => {
        return (
          <div key={blog._id}> 
            <Blogcard blog={blog} />
          </div>
        );
      })

    )}
  </div>
</>

  )
}

export default Home