import { useDispatch, useSelector } from 'react-redux'
import { useUpdateMutation } from '../slices/usersApiSlice'
import { useState, useEffect } from 'react'
import { setCreds } from '../slices/authSlice'
import { Form, Button, Container, Row } from 'react-bootstrap'
import FormComp from './FormComp'
import BlogCardList from './BlogCardList'

import Spinner from 'react-bootstrap/Spinner'
import { toast } from 'react-toastify'


const ProfileScreen = () => {
  const { userInfo } = useSelector((state)=>state.auth);
  
    const [blogs,setBlogs] = useState([]);

    const [search, setSearch] = useState('');
    const [dropdown,setDropdown] = useState(true);
    const [updating,setUpdating] = useState(false);
    const [name,setName] = useState(userInfo.name)
    const [email,setEmail] = useState(userInfo.email)
    const [pass,setPass] = useState('')
    const [confirmPass,setConfirmPass] = useState('')

    const dispatch = useDispatch();

    const [update] = useUpdateMutation();
    let isLoading = false;
    const handleUpdate = async (event)=>{
        event.preventDefault();
      if (pass !== confirmPass) {
        toast.error('Passwords do not match!')
      } else if (name === userInfo.name && email === userInfo.email && pass === '') {
        toast.info("No changes to save..");
      } else {
        try {
          const res = await update({ _id: userInfo._id, name, email, pass }).unwrap();
          dispatch(setCreds({ ...res }))
          setUpdating(false);
          toast.success('Updated Successfully!');
        } catch (err) {
          toast.error(`Can't Update : ${err?.data?.message || err.error}`)
        }
        console.log('Updated')
      }
    }

  return (
    <>
    { dropdown ? (<Container className='py-2 d-flex flex-row align-items-center gap-5'>
        <h3>Edit your Profile</h3>
        <Button onClick={()=>setDropdown(!dropdown)} className='btn-seondary py-0'>Edit</Button>
    </Container>) : 
    (<FormComp>
        <h1>Your Details: </h1>
        <Form onSubmit={handleUpdate}>
            <Form.Group className='mt-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={pass} onChange={(e)=>setPass(e.target.value)}></Form.Control>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password'  value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}></Form.Control>
            </Form.Group>

            {
                <>
                            <Button type='Submit' variant="primary" className='mt-4 m-2' onClick={()=>setUpdating(true)}>{updating ? `Saving...` : `Save Changes`}</Button>
                            <Button variant="secondary" className='mt-4 m-2' onClick={()=>setDropdown(!dropdown)}>Close</Button>
                          </>
            } 
            
            
        </Form>
    </FormComp>)}
      <Container>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <Form className='m-4 w-50' onSubmit={(e)=>e.preventDefault()}>
            <Form.Control
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
          {
            isLoading ? <Spinner animation="border" variant="primary" className='mt-5'/>
              : <BlogCardList blogs={blogs} searchText={search} />
          }

        </div>
      </Container>
    </>
  )
}

export default ProfileScreen