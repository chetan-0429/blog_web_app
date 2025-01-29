const express = require('express');
const { createBlogs, getAllBlogs, getSingleBlog,getUserBlogs,deleteBlog,updateBlog } = require('../controllers/blogControllers');
const { authentication } = require('../action');
const upload = require('../middlewares/multerConfig')
const router = express.Router();

router.post('/add', authentication, upload.single('image'), createBlogs);
router.get('/blogs',getAllBlogs);
router.get('/blog/:id',getSingleBlog);

router.get('/user/blogs', authentication, getUserBlogs);

router.delete('/blog/:id', authentication, deleteBlog);

router.put('/blog/:id', authentication, updateBlog);

module.exports = router;