import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useUpdateBlogMutation, useGetOneMutation } from '../slices/blogsApiSlice'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { toast } from 'react-toastify'

import FormComp from './FormComp'

const UpdateScreen = () => {
    const [blog,setBlog] = useState({
        title: '',
        desc: '',
        content: ''
      })

      const navigate = useNavigate();
      const [updateBlog, { isLoading }] = useUpdateBlogMutation();
      const [getOne] = useGetOneMutation();
      const id = window.location.search.slice(4);

      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await updateBlog({_id: id,...blog}).unwrap();
            toast.success("Updated Successfully!")
            if(res){
              navigate(`/blog/?id=${id}`)
            }
        } catch (error) {
            toast.error(`Can't update blog: ${error?.data?.message || error.error}`);
        }

      }
    
      useEffect( ()=>{
        const fetchBlog = async () => {
          try {
            const res = await getOne(id).unwrap();
            if(res.length===0) toast.info("No Blog to display!!")
            else{
              setBlog(res);
            }       
            
          } catch (error) {
            toast.error(`Can't fetch blog: ${error?.data?.message || error.error}`);
          }
        };
        
        fetchBlog();
        
      },[]);

  return (
    <FormComp>
    <h1>Edit your Blog here:</h1>
    <Form onSubmit={handleUpdate}>
        <Form.Group className='mt-2'>
            <Form.Label>Title</Form.Label>
            <Form.Control value={blog.title} onChange={(e)=>setBlog({...blog,title:e.target.value})}></Form.Control>
            <Form.Label>Description</Form.Label>
            <Form.Control value={blog.desc} onChange={(e)=>setBlog({...blog,desc:e.target.value})}></Form.Control>
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={10} className='mb-3' value={blog.content} onChange={(e)=>setBlog({...blog,content:e.target.value})}></Form.Control>
        </Form.Group>

        {
            isLoading ? <Spinner animation="border" variant="primary"/>
                      : <Button type='Submit' variant="primary" className='m-2'>Update!!</Button>
        }
            <Link to='/'><Button variant="secondary" className='m-2'>Go Back</Button></Link>
        </Form>
</FormComp>
  )
}

export default UpdateScreen