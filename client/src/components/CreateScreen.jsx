import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useCreateMutation } from '../slices/blogsApiSlice'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { toast } from 'react-toastify'

import FormComp from './FormComp'

const CreateScreen = () => {
  const [blog,setBlog] = useState({
    title: '',
    desc: '',
    content: ''
  })

  const navigate = useNavigate();
  const [create, { isLoading }] = useCreateMutation();
  const { userInfo } = useSelector((state)=>state.auth);

  useEffect(()=>{
    if(!userInfo){
        navigate('/');
    }
  },[userInfo, navigate]);
  
  const handleCreate = async (e)=>{
    e.preventDefault();
      try {
        const res = await create({_id: userInfo._id, title: blog.title, desc: blog.desc, content: blog.content}).unwrap();
        toast.success('Blog created Successfully!!')
        navigate('/');
      } catch (error) {
        toast.error(`Can't Create : ${err?.data?.message || err.error}`)
      }
  }

  return (
    <FormComp>
        <h1>Create your new Blog here:</h1>
        <Form onSubmit={handleCreate}>
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
                          : <Button type='Submit' variant="primary" className='m-2'>Create!!</Button>
            }
                <Link to='/'><Button variant="secondary" className='m-2'>Go Back</Button></Link>
            </Form>
    </FormComp>
  )
}

export default CreateScreen