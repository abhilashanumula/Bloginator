import React, {useState,useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetOneMutation, useDeleteBlogMutation } from '../slices/blogsApiSlice';
import Spinner from 'react-bootstrap/Spinner'
import { toast } from 'react-toastify';
import  ReactMarkdown  from 'react-markdown';
import { useNavigate } from 'react-router-dom';

function BlogPage() {
  const { userInfo } = useSelector(state=>state.auth);
  const [blog,setBlog] = useState({});
  const [isOwner,setIsOwner] = useState();
  const id = window.location.search.slice(4);
  // console.log(id)
  const navigate = useNavigate();
  
  const [getOne, { isLoading }] = useGetOneMutation();
  const [deleteBlog, { deleting }] = useDeleteBlogMutation();
  const handleDelete = async()=>{
    try {
      let con = confirm("Are you sure, you want to delete?");
      if(!con) return;
      const res = await deleteBlog({_id:blog._id}).unwrap();
      if(res) 
      {
        toast.info('Blog deleted successfully!');
        navigate('/')
        return;
      }
      }      
      
    catch (error) {
      toast.error(`Can't Delete blog: ${error?.data?.message || error.error}`);
    }
  }
  useEffect( ()=>{
    const fetchBlog = async () => {
      try {
        const res = await getOne(id).unwrap();
        if(res.length===0) toast.info("No Blog to display!!")
        else{
          setBlog(res);
          //  toast.success('Blog fetched successfully!');
        }       
        
      } catch (error) {
        toast.error(`Can't fetch blog: ${error?.data?.message || error.error}`);
      }
    };
    
    fetchBlog();
    
  },[]);
  
  setTimeout(()=>{
    if(userInfo)
      setIsOwner(userInfo._id===blog.creator._id);
  },1000)

  return (
    <>
    {isLoading 
    ? <Spinner animation="border" variant="primary"/>
    : <div className="blog-page overflow-x-auto">
      <Container fluid>
        
        <Row>
          <Col>
            <h2>{blog.title}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>{blog.desc}</h5>
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col>
             <p>
            <ReactMarkdown>
              {blog.content}
            </ReactMarkdown>
            </p>
          </Col>
        </Row>
        
      </Container>
    
        { isOwner &&
        (<div>
        <Button onClick={()=>navigate(`/update/?id=${blog._id}`)} className='btn-primary m-2'>
          Edit
        </Button>
        <Button onClick={handleDelete} className='btn-danger m-2'>
          Delete
        </Button>
        </div>) 
        }
      </div>}
    </>
  );
}

export default BlogPage;
