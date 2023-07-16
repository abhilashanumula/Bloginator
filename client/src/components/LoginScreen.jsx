import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCreds } from '../slices/authSlice'
import { toast } from 'react-toastify'

import FormComp from './FormComp'


const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[userInfo, navigate]);

    const handleSubmit = async (event)=>{
        event.preventDefault();
        try {
            const res = await login({email,pass}).unwrap();
            dispatch(setCreds({...res}));
            toast.success('Login Successful!')
            navigate('/');
        } catch (err) {
            toast.error(`Can't login : ${err?.data?.message || err.error}`)
        }
        console.log('Submit')
    }


  return (
    <FormComp>
        <h1>Sign in</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mt-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='email here' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='password here' value={pass} onChange={(e)=>setPass(e.target.value)}></Form.Control>
            </Form.Group>
            {
                isLoading ? <Spinner animation="border" variant="primary"/>
                          : <Button type='Submit' variant='primary' className='mt-2'>Sign In</Button>
            }
            <Row>
                <Col className='m-2'>
                    New User? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </Form>
    </FormComp>
  )
}

export default LoginScreen