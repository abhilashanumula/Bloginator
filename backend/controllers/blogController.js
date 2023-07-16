import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js"; 
import User from "../models/userModel.js"

// base/api/blogs/ GET
const getBlog = asyncHandler( async (req,res) =>{
    const blogs = await Blog.find().sort({createdAt: -1}).populate('creator');
    if(blogs){
        res.status(200).send(blogs);
    } else {
        res.json({message: "No blogs created!"})
    }
})

// base/api/blogs/:id GET
const getOneBlog = asyncHandler( async (req,res) =>{
    const id = req.params.id
    const blogs = await Blog.findById(id).populate('creator');
    if(blogs){
        res.status(200).send(blogs);
    } else {
        res.json({message: "No blogs created!"})
    }
})

// base/api/blogs/create POST
const createBlog = asyncHandler( async (req,res)=>{
    const { _id,title,desc,content } = req.body;
    const user = await User.findById(_id);
    if(user){
        const newBlog = await Blog.create({
            
            creator: _id,
            title,
            desc,
            content,
        })
        res.json({
            _id: Blog._id
        })
    } else {
        res.status(401);
        throw new Error('Invalid User Data!')
    }
    
})

// base/api/blogs/delete DELETE
const deleteBlog = asyncHandler( async (req,res)=>{
    const {_id} = req.body;
    const operation = await Blog.findByIdAndDelete(_id);
    if(operation){
        res.status(200).json({message: "deleted"});
    } else {
        res.status(401);
        throw new Error("Invalid Blog Id!")
    }
})

// base/api/blogs/update PUT
const blogUpdate = asyncHandler( async (req,res)=>{
    const blog = await Blog.findById(req.body._id);
    if(blog){

        blog.title = req.body.title || blog.title;
        blog.desc = req.body.desc || blog.desc;
        blog.content = req.body.content || blog.content;

        await blog.save();
        res.json({message: "Updated SuccessFully"});

    } else {
        res.status(404);
        throw new Error('Blog not Found');
    }
})

export {
    getBlog,
    getOneBlog,
    createBlog,
    blogUpdate,
    deleteBlog
}