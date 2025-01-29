const Blog = require('../models/blogModel');
const User = require('../models/userModels');

async function getUserBlogs(req, res) {
    const { id: userId } = req.user;
    try {
        const blogs = await Blog.find({ owner: userId }); 
        const blogsWithImages = blogs.map((blog) => ({
            ...blog._doc,
            images: blog.images
                ? `${req.protocol}://${req.get('host')}${blog.images}`
                : null,
        }));

        res.status(200).json({ success: true, blogs: blogsWithImages });

    } catch (err) {
        console.error('Error fetching user blogs:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// Delete a blog
async function deleteBlog(req, res) {
    const { id: blogId } = req.params;
    const { id: userId } = req.user;

    try {
  
        const blog = await Blog.findOneAndDelete({ _id: blogId, owner: userId });
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found or unauthorized' });
        }
        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// Update a blog
async function updateBlog(req, res) {
    const { id: blogId } = req.params;
    const { id: userId } = req.user;
    const { name, description } = req.body;
    console.log(req.body);
    console.log('blogId',blogId)
    console.log('userID',userId)

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; 

    try {
     
        const updatedBlog = await Blog.findOneAndUpdate(
            { _id: blogId, owner: userId },
            { name, description, ...(imagePath && { images: imagePath }) }, 
            { new: true } 
        );

        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found or unauthorized' });
        }

        console.log('upd:',updateBlog)
        res.status(200).json({ success: true, blog: updatedBlog });
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


function search(query) {
    let str = query.keyword
        ? {
              $or: [
                  { name: { $regex: query.keyword, $options: 'i' } },
                  { 'owner.name': { $regex: query.keyword, $options: 'i' } },
              ],
          }
        : {};
    return str;
}

function skipPages(query, productPerPage) {
    const currPage = query.page ? Number(query.page) : 1;
    const skipPages = productPerPage * (currPage - 1);
    return skipPages;
}

// Get all blogs
async function getAllBlogs(req, res) {
    console.log('getAllBlogs called');
    const productPerPage = 90;
    const searched = search(req.query);
    const skipPaged = skipPages(req.query, productPerPage);

    try {
        
        const blogs = await Blog.find(searched)
            .sort({ createdAt: -1 })
            .limit(productPerPage)
            .skip(skipPaged);

     
        const blogsWithImages = blogs.map((blog) => ({
            ...blog._doc,
            images: blog.images
                ? `${req.protocol}://${req.get('host')}${blog.images}`
                : null,
        }));

        res.status(200).json({ success: true, blogs: blogsWithImages });
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ success: false });
    }
}

// Get a single blog
async function getSingleBlog(req, res) {
    const id = req.params.id;
    console.log('getSingleBlog called with id:', id);

    try {
 
        const blog = await Blog.findOne({ _id: id });

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        const blogWithImage = {
            ...blog._doc,
            images: blog.images
                ? `${req.protocol}://${req.get('host')}${blog.images}`
                : null,
        };

        res.status(200).json({ success: true, blog: blogWithImage });
    } catch (err) {
        console.error('Error fetching single blog:', err);
        res.status(500).json({ success: false });
    }
}

// Create a new blog
async function createBlogs(req, res) {
    console.log('createBlogs called');

    const { id } = req.user; 
    const { name, description } = req.body; 
    const imagePath = req.file
        ? `/uploads/${req.file.filename}` 
        : null;

    try {
        const user = await User.findOne({ _id: id });

        const newBlog = new Blog({
            name,
            description,
            images: imagePath, 
            owner: id,
            ownerName: user.name,
        });

        const savedBlog = await newBlog.save();

        const blogWithImage = {
            ...savedBlog._doc,
            images: imagePath
                ? `${req.protocol}://${req.get('host')}${imagePath}`
                : null,
        };

        res.status(201).json({ success: true, blog: blogWithImage });
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {getAllBlogs,createBlogs,getSingleBlog,getUserBlogs,deleteBlog,updateBlog}
