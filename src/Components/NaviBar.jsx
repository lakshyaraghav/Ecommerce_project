import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css_folder/Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cartlogo from './Assets/cartlogo.png';
import userprofile from './Assets/userprofile.png';
import { auth, db } from '../FirebaseConfigs/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Col, Row } from 'react-bootstrap';


const NaviBar = () => {

  function GetCurrentUsers() {

    const [user, setUser] = useState('')

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
            // console.log(q)
            const data = await getDocs(q)
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // console.log(data)
          }
          getUsers();
        }
        else {
          setUser(null)
        }
      })
    }, [])
    return user
  }
  const loggeduser = GetCurrentUsers();
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login")
    })
  }



  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto nav-left">


          </Nav>
          <Nav className="nav-right">
            <Link to='/'><button>Home</button></Link>
            <Link to='/sellproduct'><button>Sell</button></Link>



            {!loggeduser ?
              <>
                <Link to='/signup'><button>SignUp</button></Link>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'>
                  <div className="cart-btn">
                    <img src={cartlogo} alt="no img" />
                    <span className='cart-icon-css'>0</span>
                  </div>
                </Link>
              </>
              :
              <>

                <Link to=''><button onClick={handleLogout}>Logout</button></Link>
                <Link to='/cart'>
                  <div className="cart-btn">
                    <img src={cartlogo} alt="no img" />
                    <span className='cart-icon-css'>{loggeduser[0].cart}</span>
                  </div>
                </Link>

              </>
            }

            <Link to="/userprofile">
              <img src={userprofile} alt="user profile" className='profile-icon' />
            </Link>

          </Nav>
        </Container>
      </Navbar>
      <Container fluid className='bg-warning p-2'>
        <Row className="justify-content-center">
          <Col xs="auto" className="text-center">
            {/* <a href="/product-type/mobiles" className="border border-dark text-white p-1">Mobile</a> */}
            <Link to="/product-type/mobiles" className="border border-dark text-white p-1">Mobile</Link>
          </Col>
          <Col xs="auto" className="text-center">
            {/* <a href="/product-type/laptops" className="border border-dark text-white p-1">Laptop</a> */}
            <Link to="/product-type/laptops" className="border border-dark text-white p-1">Laptop</Link>
          </Col>
          <Col xs="auto" className="text-center">
            {/* <a href="/product-type/cameras" className="border border-dark text-white p-1">Camera</a> */}
            <Link to="/product-type/cameras" className="border border-dark text-white p-1">Camera</Link>

          </Col>
          <Col xs="auto" className="text-center">
            {/* <a href="/product-type/shoes" className="border border-dark text-white p-1">Shoes</a> */}
            <Link to="/product-type/shoes" className="border border-dark text-white p-1">Shoes</Link>
          </Col>
        </Row>
      </Container>
    </div>

  )
}

export default NaviBar