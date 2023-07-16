import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
},{
    timestamps: true
});



const Blog = mongoose.model('Blog',blogSchema);

export default Blog;