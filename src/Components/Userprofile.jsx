import React, { useEffect, useState } from 'react'
import NaviBar from './NaviBar'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Userprofile = () => {

  // function GetCurrentUsers() {

    const [user, setUser] = useState({})

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
            // console.log(q)
            const data = await getDocs(q)
            const userdetail= data.docs[0].data()
            // setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setUser(userdetail)
            console.log(data.docs[0].data())
          }
          getUsers();
        }
        else {
          setUser({})
        }
      })

    }, [])
    // return user
  // }
  // const loggeduser = GetCurrentUsers();
  // if(loggeduser){console.log("1", loggeduser[0])}

  return (
    <div>
      <NaviBar />
      <Card className="mt-5 container text-center" style={{ width: '45rem' }}>

        {console.log(Object.keys(user))}

        {Object.keys(user).length>0?
        <>
        <Card.Header><h1>Profile Details</h1></Card.Header>
        <Card.Body>
          <Card.Title>Email</Card.Title>
          <Card.Text>
            {user.email}
          </Card.Text>
          <Card.Title>Username</Card.Title>
          <Card.Text>
            {user.username}
          </Card.Text>
          <Link to={'/home'}><Button variant="primary">Go to Homepage</Button></Link>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
        
        </>
        :
        <h3>You are not logged in yet</h3>
        
        }
        
        
        
      </Card>

      {/* {loggeduser[0].username}<br></br>
      {loggeduser[0].email} */}
     

      Profile
    </div>
  )
}

export default Userprofile