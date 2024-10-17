const Blog = require('../models/blogModel')
const User = require('../models/userModels')

function search(query){
      let str = query.keyword ? {
        $or:[
            {name:{$regex:query.keyword,$options:'i'} },
            {"owner.name":{$regex:query.keyword, $options:'i'}}
        ]
      }: {};
    return str;
}

function skipPages(query,productPerPage){
    const currPage =  query.page ? Number(query.page) : 1 
    const skipPages = productPerPage * (currPage-1);
    return skipPages;
}

async function getAllBlogs(req,res){
    console.log('hello')
    const productPerPage = 90;
    const searched = search(req.query);
    const skipPaged = skipPages(req.query,productPerPage);
    try{
    //    const blogs = await Blog.find(searched).populate('owner','name').limit(productPerPage).skip(skipPages);
       const blogs = await Blog.find(searched).limit(productPerPage).skip(skipPages);
       res.status(200).json({success:true,blogs})
    }catch(err){
        res.status(500).json({success:false});
    }
}
async function getSingleBlog(req,res){
    const id = req.params.id;
    console.log(req.params);
    try{
      const blog = await Blog.findOne({_id:id});
       res.status(200).json({success:true,blog})
    }catch(err){
        res.status(500).json({success:false});
    }
}

async function createBlogs(req,res){
    console.log('createBlogs called');
    const {id} = req.user;
    const {name,description,images} = req.body;
    console.log(req.body)
    try{
        const user = await User.findOne({_id:id})
       const newBlog = await new Blog({
            name,
            description,
            images,
            owner:id,
            ownerName:user.name
        })
        const savedBlog = await newBlog.save();
        res.status(201).json({success:true,blog:savedBlog});
    }catch(err){
        res.status(500).json({success:false});
    }
}

module.exports = {getAllBlogs,createBlogs,getSingleBlog}