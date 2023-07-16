import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js"; 

// base/api/users/auth POST
const authUser = asyncHandler( async (req,res)=>{
    const { email,pass } = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPasswords(pass))){
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401);
        throw new Error('Invalid User Data!')
    }
    
})

// base/api/users/ POST
const regUser = asyncHandler( async (req,res)=>{
    const { name,email,pass } = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name,
        email,
        pass
    });

    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Can\'t Register')
    }
})

// base/api/users/logout POST
const logoutUser = asyncHandler( async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({mess : "User logged out"})
})

// base/api/users/profile GET
const profileUser = asyncHandler( async (req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(404);
        throw new Error("User not found!")
    }
})

// base/api/users/profile PUT
const profileUpdate = asyncHandler( async (req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.pass){
            user.pass = req.body.pass;
        }

        const updateduser = await user.save();
        res.json({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
        });

    } else {
        res.status(404);
        throw new Error('User not Found');
    }
})

export {
    authUser,
    regUser,
    logoutUser,
    profileUser,
    profileUpdate
};