const Blog = require('../models/blogModel');
const User = require('../models/userModels');

async function getUserBlogs(req, res) {
    const { id: userId } = req.user; // Extract user ID from token
    try {
        const blogs = await Blog.find({ owner: userId }); // Find blogs by owner
        const blogsWithImages = blogs.map((blog) => ({
            ...blog._doc,
            images: blog.images
                ? `${req.protocol}://${req.get('host')}${blog.images}`
                : null,
        }));

        res.status(200).json({ success: true, blogs: blogsWithImages });
        // res.status(200).json({ success: true, blogs });
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
        // Find and delete the blog, only if the logged-in user is the owner
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

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // If a new image is uploaded

    try {
        // Find the blog and update, ensuring the logged-in user is the owner
        const updatedBlog = await Blog.findOneAndUpdate(
            { _id: blogId, owner: userId },
            { name, description, ...(imagePath && { images: imagePath }) }, // Update image if provided
            { new: true } // Return the updated blog
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

// Helper functions
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
        // Fetch blogs with owner and image URLs populated
        const blogs = await Blog.find(searched)
            .sort({ createdAt: -1 })
            .limit(productPerPage)
            .skip(skipPaged);

        // Update blogs to include absolute image URLs
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
        // Fetch the blog by ID
        const blog = await Blog.findOne({ _id: id });

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // Add absolute URL for the image
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

    const { id } = req.user; // Extract user ID from request
    const { name, description } = req.body; // Extract blog details from request
    const imagePath = req.file
        ? `/uploads/${req.file.filename}` // Save relative path in database
        : null;

    try {
        // Find the user by ID
        const user = await User.findOne({ _id: id });

        // Create a new blog
        const newBlog = new Blog({
            name,
            description,
            images: imagePath, // Save relative path in database
            owner: id,
            ownerName: user.name,
        });

        // Save the blog to the database
        const savedBlog = await newBlog.save();

        // Add absolute URL to the saved blog
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



// const Blog = require('../models/blogModel')
// const User = require('../models/userModels')

// function search(query){
//       let str = query.keyword ? {
//         $or:[
//             {name:{$regex:query.keyword,$options:'i'} },
//             {"owner.name":{$regex:query.keyword, $options:'i'}}
//         ]
//       }: {};
//     return str;
// }

// function skipPages(query,productPerPage){
//     const currPage =  query.page ? Number(query.page) : 1 
//     const skipPages = productPerPage * (currPage-1);
//     return skipPages;
// }

// async function getAllBlogs(req,res){
//     console.log('hello')
//     const productPerPage = 90;
//     const searched = search(req.query);
//     const skipPaged = skipPages(req.query,productPerPage);
//     try{
//     //    const blogs = await Blog.find(searched).populate('owner','name').limit(productPerPage).skip(skipPages);
//        const blogs = await Blog.find(searched).limit(productPerPage).skip(skipPages);
//        res.status(200).json({success:true,blogs})
//     }catch(err){
//         res.status(500).json({success:false});
//     }
// }
// async function getSingleBlog(req,res){
//     const id = req.params.id;
//     console.log('id: ', req.params);
//     try{
//       const blog = await Blog.findOne({_id:id});
//        res.status(200).json({success:true,blog})
//     }catch(err){
//         res.status(500).json({success:false});
//     }
// }

// async function createBlogs(req, res) {
//     console.log('createBlogs called');

//     const { id } = req.user; // Extract user ID from request
//     const { name, description } = req.body; // Extract blog details from request
//     const imagePath = req.file 
//         ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` 
//         : null; // Generate full URL for uploaded image

//     try {
//         // Find the user by ID
//         const user = await User.findOne({ _id: id });

//         // Create a new blog
//         const newBlog = new Blog({
//             name,
//             description,
//             images: imagePath, // Save the image URL in the database
//             owner: id,
//             ownerName: user.name,
//         });

//         // Save the blog to the database
//         const savedBlog = await newBlog.save();

//         res.status(201).json({ success: true, blog: savedBlog });
//     } catch (err) {
//         console.error('Error creating blog:', err);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// }

// // async function createBlogs(req,res){
// //     console.log('createBlogs called');

// //     const { id } = req.user;
// //     const { name, description } = req.body;
// //     const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Path for uploaded image

// //     try {
// //         // Find the user by ID
// //         const user = await User.findOne({ _id: id });

// //         // Create a new blog
// //         const newBlog = new Blog({
// //             name,
// //             description,
// //             images: imagePath, // Save the image path in the database
// //             owner: id,
// //             ownerName: user.name,
// //         });

// //         // Save the blog to the database
// //         const savedBlog = await newBlog.save();

// //         res.status(201).json({ success: true, blog: savedBlog });
// //     } catch (err) {
// //         console.error('Error creating blog:', err);
// //         res.status(500).json({ success: false, message: 'Server error' });
// //     }
// // }


// // console.log('createBlogs called');
// // const {id} = req.user;
// // const {name,description,images} = req.body;
// // console.log(req.body)
// // try{
// //     const user = await User.findOne({_id:id})
// //    const newBlog = await new Blog({
// //         name,
// //         description,
// //         images,
// //         owner:id,
// //         ownerName:user.name
// //     })
// //     const savedBlog = await newBlog.save();
// //     res.status(201).json({success:true,blog:savedBlog});
// // }catch(err){
// //     res.status(500).json({success:false});
// // }