import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const BlogCard = ({blog}) => {
  return (
    

    <Card className='w-75 mb-3 overflow-x-auto p-2'>
      <Card.Body>
        <Link to={`/blog/?id=${blog._id}`}><Button className='float-end btn-sm btn-info'  >View</Button></Link>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>
          {blog.desc}
        </Card.Text>
        <Card.Text>
          <ReactMarkdown>
          {blog.content}
          </ReactMarkdown>
        </Card.Text>
      <span className='text-muted'>created by <b>{blog.creator.name}</b></span>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
