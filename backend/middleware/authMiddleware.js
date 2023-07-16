import  jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler( async (req,res,next) => {
    let token = req.cookies.jwt;
    if(token){
        try {
            const decodedId = jwt.verify(token,process.env.JWT_SECRET);

            req.user = await User.findById(decodedId.userId).select('-pass');

            next();

        } catch (error) {
            res.status(401)
            throw new Error("Something Broke! Login Again!")
        }
    } else {
        res.status(401)
        throw new Error("Login again!")
    }
});

export { protect };
