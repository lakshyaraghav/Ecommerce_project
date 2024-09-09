import React, { useState } from 'react'
import NaviBar from './NaviBar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfigs/firebaseConfig';

const Login = () => {

    const[email,setEmail]=useState("")
    const[pass,setPass]=useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate();

    const handleLogin=(e)=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,pass)
        .then((userCreds)=>{
            setSuccessMsg("User is login successfully, You 'll be redirect to home page")
            setEmail('')
            setPass('')
            setErrMsg('')
            setTimeout(()=>{
                setSuccessMsg('');
                navigate('/home');
            },3000)
        })
        .catch((error) => {

            if (error.message === 'Firebase: Error (auth/invalid-email).') {
                setErrMsg('User already exist')
            }
            else {
                setErrMsg(error.message);
            }

        })
    }

    return (
        <div>
            <NaviBar />
            <Container className="mt-5 login-container">
            <h5 className="text-center text-danger">{successMsg}</h5>
            <h5 className="text-center text-danger">{errMsg}</h5>
            <Row className="justify-content-md-center">
            <Col md={6}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" id='submitLogin' type="submit" onClick={handleLogin}>
                    Submit
                </Button>
            </Form>
            <p className="text-center signin-link">Don't have an account? <Link to='/signup'>Sign Up</Link> </p>
            </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Login