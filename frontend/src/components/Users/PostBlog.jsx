import React, { useState } from 'react';
import axios from 'axios';
import { getUrl } from '../../action';
import { useSelector } from 'react-redux';

function PostBlog() {
    const auth = useSelector((state) => state.auth);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); 

    async function handleClick(e) {
        e.preventDefault();

        const url = getUrl('/add'); 
        const formData = new FormData(); 

       
        formData.append('name', name);
        formData.append('description', description);

      
        if (image) {
            formData.append('image', image);
        }

        try {
            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${auth.token}`, 
                },
            });
            console.log('Blog created successfully:', res.data);
        } catch (err) {
            console.error('Error creating blog:', err);
        }
    }

    return (
        <>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Blog name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    placeholder="Blog description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div>
                <label>Image</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])} 
                />
            </div>
            <button onClick={handleClick}>Submit</button>
        </>
    );
}

export default PostBlog;
