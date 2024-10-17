const express = require('express');
const { createBlogs, getAllBlogs, getSingleBlog } = require('../controllers/blogControllers');
const { authentication } = require('../action');
const router = express.Router();

router.post('/add',authentication,createBlogs);
router.get('/blogs',getAllBlogs);
router.get('/blog/:id',getSingleBlog);

module.exports = router;