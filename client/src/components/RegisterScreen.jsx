import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setCreds } from '../slices/authSlice'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormComp from './FormComp'
import Spinner from 'react-bootstrap/Spinner'
import { toast } from 'react-toastify'


const RegisterScreen = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [confirmPass,setConfirmPass] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[userInfo, navigate]);

    const handleRegister = async (event)=>{
        event.preventDefault();
        if(pass !== confirmPass){
            toast.error('Passwords do not match!')
        } else {
             try {
                const res = await register({name,email,pass}).unwrap();
                dispatch(setCreds({...res}))
                toast.success('Registered Succesfully!');
            } catch (err) {
                toast.error(`Can't register : ${err?.data?.message || err.error}`)
            }
            console.log('Registered')
        }
    }

  return (
    <FormComp>
        <h1>Sign Up</h1>
        <Form onSubmit={handleRegister}>
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
                isLoading ? <Spinner animation="border" variant="secondary"/>
                          : <Button type='Submit' variant="secondary" className='m-2'>Sign Up</Button>
            }
            
            

            <Row>
                <Col className='m-2'>
                    Already an User? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </Form>
    </FormComp>
  )
}

export default RegisterScreen