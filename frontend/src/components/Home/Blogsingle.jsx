import React from 'react'
import { Link, useLocation, useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import { useState ,useEffect} from 'react'

function Blogsingle() {
  const {id} = useParams()
  console.log(id)
    const [blog,setBlog] = useState({});

    async function fetchBlog(){
        try{
            const res = await axios.get(`/api/blog/${id}`);
            if(res.data.success){
                   setBlog(res.data.blog);
                console.log('hkfke',res.data.blog)
            }
        }catch(err){
            console.log('error',err);
        }

       }
     
       useEffect(()=>{
         fetchBlog();
       },[])

  return (
      <>
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">{blog.name}</h3>

            <div className="flex flex-col md:flex-row justify-center items-center">
              <img
                src={blog.images}
                alt={blog.name}
                className="w-full md:w-2/3 rounded-lg mb-4 md:mb-0 md:mr-4"
                />
              <p className="text-gray-700 flex-1">{blog.description}</p>
            </div>
              
           <div className='flex justify-between'>
           <h4 className="mt-4 text-gray-600 flex items-center">
            Upvote: 
          <span className="font-medium ml-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">
                {blog.likes}
              </button>
           </span>
          </h4>
            <div className="mt-4 flex items-center">
                    <span className="font-medium text-blue-400 hover:text-blue-700 transition duration-200 flex items-center ml-2">
                      <img 
                          src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png" 
                          alt="User Icon" 
                          className="w-6 h-6 mr-1" 
                          />
                        <Link to={`/users/${blog.owner}`} className="hover:underline">
                          {blog.ownerName}
                        </Link>
              </span>
            </div>

          </div>
           </div>
                          </>
  )
}

export default Blogsingle