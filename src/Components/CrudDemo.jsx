import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { empData } from './emp_data'
import { Link } from 'react-router-dom'


const CrudDemo = () => {


  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [cpass, setCpass] = useState("")
  const [data, setData] = useState([])
  const [id, setId] = useState(0)
  const [isUpdate, setIsUpdate] = useState(false)


  useEffect(() => {
    setData(empData)
  }, [])

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true)
      setId(id)
      setUsername(dt[0].userName)
      setEmail(dt[0].email)
      setPass(dt[0].pass)
      setCpass(dt[0].cnfPass)
    }
  }
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure want to delete")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt)
      }
    }
  }

  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id)

    const dt = [...data];
    dt[index].userName = username
    dt[index].email = email
    dt[index].pass = pass
    dt[index].cnfPass = cpass
    setData(dt)
    // alert("this is handle update function")
    handleClear()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dt= [...data]
    const newObject={
        id:empData.length+1,
        userName:username,
        email:email,
        pass:pass,
        cnfPass:cpass
    }
    dt.push(newObject)
    setData(dt)
    handleClear()
  }

  const handleClear=()=>{
    setId(0);
    setUsername('');
    setEmail('')
    setPass('');
    setCpass('')
    setIsUpdate(false)
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
                <tr>
                  <td>{item.id}</td>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.pass}</td>
                  <td>{item.cnfPass}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>


      <Container className="signup-container">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="text-center">Create an Account</h2>
            {/* <h5 className="text-center text-danger">{successMsg}</h5>
            <h5 className="text-center text-danger">{errMsg}</h5> */}
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
                  <Button variant="primary" type="submit" className="signup-btn" onClick={(e) => handleSubmit(e)}>
                    Sign Up
                  </Button>
                  :
                  <Button variant="danger" type="submit" className="signup-btn" onClick={() => handleUpdate()}>
                    Update
                  </Button>

              }
              <Button variant="danger" type="submit" className="signup-btn" onClick={() => handleClear()}>
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

export default CrudDemo