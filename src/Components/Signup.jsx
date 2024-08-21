import React, { useEffect, useState } from 'react'
import NaviBar from './NaviBar'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

const Signup = () => {

    // const[username,setUsername]={}
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [cpass, setCpass] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [data, setData] = useState([])
    const [id, setId] = useState(0)
    const [isUpdate, setIsUpdate] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        const getUser = async () => {
            const data = await getDocs(collection(db, "users"))
            setData(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        }
        getUser()
    }, [])

    // console.log(data)
    const handleEdit = async (id, username, email, pass, cpass) => {

        setIsUpdate(true)
        setId(id)
        setUsername(username)
        setEmail(email)
        setPass(pass)
        setCpass(cpass)

        // alert('this is handle edit function')
    }

    const handleDelete = async (id) => {
        if (id != null) {
            if (window.confirm("Are you sure want to delete")) {
                const userDoc = doc(db, "users", id)
                await deleteDoc(userDoc)

                const updatedData = data.map((item) =>
                    item.id === id ? { ...item, username, email, pass, cpass } : item
                );
                setData(updatedData);
            }
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const userDoc = doc(db, "users", id)
        await updateDoc(userDoc, {
            username: username,
            email: email,
            pass: pass,
            cpass: cpass
        });
        const updatedData = data.map((item) =>
            item.id === id ? { ...item, username, email, pass, cpass } : item
        );
        setData(updatedData);
        handleClear();
        setSuccessMsg("User updated successfully.");

    }

    const handleClear = () => {
        setId(0);
        setUsername('');
        setEmail('')
        setPass('');
        setCpass('')
        setIsUpdate(false)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCreds) => {
                const user = userCreds.user
                const initialcartValue = 0;
                console.log(user)

                addDoc(collection(db, "users"), {
                    username: username,
                    email: email,
                    pass: pass,
                    cpass: cpass,
                    cart: initialcartValue,
                    uid: user.uid
                }).then(() => {
                    setSuccessMsg('New user is created in Firebase database, You will now automatically redirect to lgin page')
                    setEmail('');
                    setUsername('');
                    setPass('');
                    setCpass('')

                    setTimeout(() => {
                        setSuccessMsg('');
                        navigate('/login');

                    }, 4000);
                })
                    .catch((error) => { setErrMsg(error.message) })
            })
            .catch((error) => {

                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setErrMsg('User already exist')
                }
                else {
                    setErrMsg(error.message);
                }

            })

        console.log(username, email, pass, cpass)
    }


    return (
        <div>

            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Password</td>
                        <td>Confirm Password</td>
                    </tr>

                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.pass}</td>
                                    <td>{item.cpass}</td>
                                    <td>
                                        <button className='btn btn-primary' onClick={() => handleEdit(item.id, item.username, item.email, item.pass, item.cpass)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <NaviBar />
            <Container className="signup-container">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h2 className="text-center">Create an Account</h2>
                        <h5 className="text-center text-danger">{successMsg}</h5>
                        <h5 className="text-center text-danger">{errMsg}</h5>
                        <Form className="signup-form">
                            <Form.Group >
                                <Form.Label>Username</Form.Label>
                                <Form.Control id='username' name='username' type="text" placeholder="Enter your username" value={username} required onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control id='email' name='email' type="email" placeholder="Enter your email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control id='pass' name='pass' type="password" placeholder="Enter your password" value={pass} required onChange={(e) => setPass(e.target.value)} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control id='cPass' name='cPass' type="password" placeholder="Confirm your password" value={cpass} required onChange={(e) => setCpass(e.target.value)} />
                            </Form.Group>

                            {
                                !isUpdate ?
                                    <Button variant="primary" type="submit" className="signup-btn" onClick={handleSubmit}>
                                        Sign Up
                                    </Button>
                                    :
                                    <Button variant="danger" type="submit" className="signup-btn" onClick={handleUpdate}>
                                        Update
                                    </Button>

                            }
                            <Button variant="success" type="submit" className="signup-btn" onClick={() => handleClear()}>
                                Clear
                            </Button>

                        </Form>
                        <p className="text-center signin-link">Already have an account? <Link to='/login'>Sign in</Link> </p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signup