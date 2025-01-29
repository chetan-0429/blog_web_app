import React, { useState } from 'react'
import axios from 'axios';
import { getUrl } from '../../action';
import { useSelector } from 'react-redux';
function PostBlog() {

const auth = useSelector(state => state.auth);

const [name,setName] = useState('');
const [description,setDescription] = useState('');
const [images,setImages] = useState('');
async function handleClick(e){
    e.preventDefault();
    const url = getUrl('/add');
    try{
        const res =  await axios.post(url,{name,description,images},{
            headers:{'Authorization':`Bearer ${auth.token}`}
        })
        console.log('res: posting ',res);
    }catch(err){
        console.log('error in posting , ',err);
    }
   
}
  return (
    <>
       <div>
      Name  <input type="text" id="" placeholder='blog name' onChange={(e)=>{setName(e.target.value)}}/>
       </div>
       <div>
      Description  <textarea name="" id="" placeholder='blog description' onChange={(e)=>{setDescription(e.target.value)}}></textarea>
      {/* Description   type="text" name="" id="" placeholder='blog description' onChange={(e)=>{setDescription(e.value)}}/> */}
       </div>
       <div>
       Images <input type="text" name="" id="" placeholder='images' onChange={(e)=>{setImages(e.target.value)}}/>
       </div>
       <button onClick={handleClick}>submit</button>
    </>
  )
}

export default PostBlog