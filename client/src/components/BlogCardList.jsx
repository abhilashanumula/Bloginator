import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { useNavigation } from 'react-router-dom';

const BlogCardList = ({ blogs, searchText }) => {
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);
    const navigate = useNavigation();
    useEffect(()=>{
        const res= blogs.filter((blog)=>{
            return searchText.toLowerCase() ==='' 
            || (blog.title.toLowerCase()).split(" ").includes(searchText)
            || (blog.desc.toLowerCase()).split(" ").includes(searchText)
            || (blog.content.toLowerCase()).split(" ").includes(searchText)
            || (blog.creator.name.toLowerCase()).split(" ").includes(searchText)
        })
        setFilteredBlogs(res);
    },[searchText])
  return (
    <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
        {
            filteredBlogs.map((blog)=>(
                <BlogCard  key={blog._id} blog={blog} />
            ))
        }
        
    </div>
  )
}

export default BlogCardList