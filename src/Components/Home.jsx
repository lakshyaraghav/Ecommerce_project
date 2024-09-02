import React, { useEffect, useState } from 'react'
import NaviBar from './NaviBar'
import Banner from './Banner'
import { auth, db } from '../FirebaseConfigs/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Home = () => {

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
  if(loggeduser){console.log("1", loggeduser[0])}

  return (
    <div>
      <NaviBar />
      <Banner />
      <p>{loggeduser?loggeduser[0].email:"No data"}</p>
      
    </div>
  )
}

export default Home