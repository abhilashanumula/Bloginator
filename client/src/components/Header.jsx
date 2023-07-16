import React from 'react'

import { Navbar, Nav, Container, NavDropdown, Badge, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { removeCreds } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Header = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [logout, { isLoading }] = useLogoutMutation();
  const { userInfo } = useSelector((state)=>state.auth);

  const handleLogout = async ()=>{
    try {
        await logout().unwrap();
        dispatch(removeCreds());
        toast.success('Logged out successfully!')
        navigate('/');
        console.log('Logged out')
    } catch (err) {
        toast.error(`Can't logout : ${err?.data?.message || err.error}`)
    }
}

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          
            <LinkContainer to='/'><Navbar.Brand>BLOGINATOR</Navbar.Brand></LinkContainer>
          
          <Nav className="left-30">
            {
              userInfo ? (
                            <>
                             <LinkContainer to='/create'><Nav.Link>Create New</Nav.Link></LinkContainer>
                              <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to={'/profile'}>
                                  <NavDropdown.Item>
                                    Profile
                                  </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={handleLogout}>
                                  Logout
                                </NavDropdown.Item>
                              </NavDropdown>
                            </>
                         )
                       : ( <>
                             <LinkContainer to='/login'><Nav.Link>Sign In</Nav.Link></LinkContainer>
                             <LinkContainer to="/register"><Nav.Link>Sign Up</Nav.Link></LinkContainer>
                          </>
                       )
            }
            
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header