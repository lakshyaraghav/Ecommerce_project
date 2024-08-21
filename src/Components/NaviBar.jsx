import React from 'react'
import { Link } from 'react-router-dom'
import './css_folder/Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cartlogo from './Assets/cartlogo.png';
import userprofile from './Assets/userprofile.png';


const NaviBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto nav-left">
          <Link to='/'><button>Home</button></Link>
          <Link to='/login'><button>Login</button></Link>
          <Link to='/signup'><button>SignUp</button></Link>
        </Nav>
        <Nav className="nav-right">
        <Link to='/cart'>
            <div className="cart-btn">
              <img src={cartlogo} alt="no img" />
              <span className='cart-icon-css'>0</span>
            </div>
          </Link>
          
          <Link to="/profile">
            <img src={userprofile} alt="user profile" className='profile-icon' />
          </Link>

        </Nav>
      </Container>
    </Navbar>
  )
}

export default NaviBar