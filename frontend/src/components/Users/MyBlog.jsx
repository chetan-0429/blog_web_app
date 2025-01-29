import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUrl } from "../../action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyBlog() {
  const [blogs, setBlogs] = useState([]);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user-specific blogs from the backend
    async function fetchBlogs() {
      const url = getUrl("/user/blogs"); // Backend endpoint for fetching user's blogs
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setBlogs(response.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    }

    fetchBlogs();
  }, [auth.token]);

  const handleDelete = async (id) => {
    const url = getUrl(`/blog/${id}`);
    try {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Redirect to the edit blog page
  };

  console.log("blog::::::",blogs)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center py-6">My Blogs</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 w-80"
            >
              <h3 className="text-xl font-semibold mb-2">{blog.name}</h3>
              {blog.images && (
                <img
                  src={blog.images}
                  alt={blog.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-gray-400 text-sm mb-4">
                {blog.description.length > 100
                  ? `${blog.description.slice(0, 100)}...`
                  : blog.description}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No blogs found.</p>
        )}
      </div>
    </div>
  );
}

export default MyBlog;
