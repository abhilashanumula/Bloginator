import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetMutation } from '../slices/blogsApiSlice';
import Spinner from 'react-bootstrap/Spinner'
import { toast } from 'react-toastify';


import BlogCardList from './BlogCardList';


const Homescreen = () => {
  const [blogs,setBlogs] = useState([]);
  const [loaded,setLoaded] = useState(false);
  const [search, setSearch] = useState('');
  
  
  const { userInfo } = useSelector(state=>state.auth);
  const [get,{isLoading}] = useGetMutation();
    const fetchBlogs = async () => {
      try {
        const res = await get().unwrap();
        if(res.length===0) toast.info("No Blogs to display!!")
        else{
           setBlogs(res);
           toast.success('Blogs fetched successfully!');
    setLoaded(true);
        }       
        
      } catch (error) {
        toast.error(`Can't fetch blogs: ${error?.data?.message || error.error}`);
      }
    };
  useEffect( ()=>{
    fetchBlogs();
  },[]);

 
 
 return (
<div className="py-5">
      <Container className='d-flex justify-content-center align-items-center'>
        <Row className="p-5 d-flex flex-column align-items-center">
          <Col className='py-5 text-center'>
            <h1>Basic Blog Application</h1>
            <p>Basic Demonstration of MERN Authentication by storing a JWT in an HTTP-Only Cookie.</p>
            { !userInfo && 
            <div className="hero-buttons">
              <LinkContainer to='/login'>
                <Button variant="primary" size="lg" className='m-2'>Sign In</Button>
               </LinkContainer>
               {' '}
             <LinkContainer to='/register'> 
              <Button variant="secondary" size="lg">Sign Up</Button>
              </LinkContainer>
            </div>
            }
          </Col>
        <Form  onSubmit={(e)=>e.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            /></Form>
        </Row>
      </Container>
      <div className='d-flex flex-column justify-content-center align-items-center'>
      {isLoading && <Spinner/>}
      {loaded && <BlogCardList blogs={blogs} searchText={search}/>}
      </div>
    </div>
  );
};

export default Homescreen;
