import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Blogcard({ blog }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const { description = "" } = blog;

  const handleClick = (e, id) => {
    navigate(`/blog/${id}`);
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-6 w-11/12 max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-center text-white">{blog.name}</h3>
        <button onClick={(e) => handleClick(e, blog._id)}>
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <img
                src={blog.images}
                alt={blog.name}
                className="w-full rounded-lg mb-4"
              />
            </div>
          </div>
        </button>
        <div>
          <p className="text-gray-300 text-justify">
            {isExpanded
              ? description
              : description.length > 200
              ? `${description.slice(0, 200)}...`
              : description}
            {description.length > 200 && (
              <span
                onClick={toggleReadMore}
                className="text-blue-400 cursor-pointer ml-2 hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </span>
            )}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <h4 className="text-gray-400 flex items-center">
            Upvote:
            <span className="font-medium ml-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200">
                {blog.likes}
              </button>
            </span>
          </h4>
          <div className="flex items-center">
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
    </div>
  );
}

export default Blogcard;
