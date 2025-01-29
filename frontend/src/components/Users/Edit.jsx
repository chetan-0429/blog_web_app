// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import axios from 'axios';
// import { getUrl } from "../../action";

// function Edit() {
//       const auth = useSelector((state) => state.auth);
//   const { id } = useParams(); // Get blog ID from URL
//   const navigate = useNavigate();
//   const [blogData, setBlogData] = useState({
//     name: '',
//     description: '',
//     images: '',
//   });
//   const [newImage, setNewImage] = useState(null); // For uploading a new image
//   console.log('id: ',id);

//   useEffect(() => {
//     // Fetch the blog details to prefill the form
//     const fetchBlog = async () => {
//       try {
//         const url = getUrl(`/blog/${id}`);
//         const { data } = await axios.get(url);
//         if (data.success) {
//           setBlogData(data.blog);
//         } else {
//           console.error('Failed to fetch blog details');
//         }
//       } catch (err) {
//         console.error('Error fetching blog:', err);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData({ ...blogData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setNewImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', blogData.name);
//     formData.append('description', blogData.description);
//     if (newImage) {
//       formData.append('image', newImage);
//     }

//     try {
//         const url = getUrl(`/blog/${id}`);
//         console.log('formdata: ',formData)
//       const { data } = await axios.put(url, formData, {
//         headers: { Authorization: `Bearer ${auth.token}` },
//       });
//       console.log('data: ',data);
//       if (data.success) {
//         alert('Blog updated successfully');
//         navigate(`/blog/${id}`); // Redirect to the blog page
//       } else {
//         console.error('Failed to update blog');
//       }
//     } catch (err) {
//       console.error('Error updating blog:', err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Edit Blog</h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//             Blog Title
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={blogData.name}
//             onChange={handleInputChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={blogData.description}
//             onChange={handleInputChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             rows="4"
//             required
//           ></textarea>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//             Update Image (Optional)
//           </label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             onChange={handleFileChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Save Changes
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Edit;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getUrl } from "../../action";

function Edit() {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();

  // Use useState to manage blog fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // For uploading a new image (base64 string)

  useEffect(() => {
    // Fetch the blog details to prefill the form
    const fetchBlog = async () => {
      try {
        const url = getUrl(`/blog/${id}`);
        const { data } = await axios.get(url);
        if (data.success) {
          setName(data.blog.name);
          setDescription(data.blog.description);
          setImage(data.blog.image); // Assuming image URL or base64 string is stored in the blog
        } else {
          console.error('Failed to fetch blog details');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle input changes
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the base64-encoded image
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const updatedBlogData = {
      name,
      description,
      image, 
    };

    try {
      const url = getUrl(`/blog/${id}`);
      const { data } = await axios.put(url, updatedBlogData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response: ', data);
      if (data.success) {
        alert('Blog updated successfully');
        navigate(`/blog/${id}`); 
      } else {
        console.error('Failed to update blog');
      }
    } catch (err) {
      console.error('Error updating blog:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Blog</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Blog Title
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Update Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
