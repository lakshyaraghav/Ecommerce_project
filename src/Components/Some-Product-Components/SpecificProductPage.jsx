import React, { useEffect, useState } from 'react'
import NaviBar from '../NaviBar'
import { useParams } from 'react-router-dom'
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../FirebaseConfigs/firebaseConfig'
import { Button, Card, Col, Row } from 'react-bootstrap'
import ProductSliderHome from './ProductSliderHome'

const SpecificProductPage = () => {

  const{id,type}=useParams()
  const[product,setProduct]=useState('');
  const[successMsg,setSuccessMsg]=useState('');
  const[errormsg,setError]=useState('');

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

  useEffect(() => {
    const getProducts = async() => {
        const productArray = [];
        const docRef = doc(db,`products-${type.toUpperCase()}`,id);
        const docSnap=await getDoc(docRef);
        setProduct(docSnap.data());
        // console.log(path)

    };
    getProducts()
},[])


  const addToCart=()=>{
    if(loggeduser){
      addDoc(collection(db,`cart-${loggeduser[0].uid}`),{
        product,quantity:1
      }).then(()=>{
        setSuccessMsg("Product is successfully added to cart");
        setTimeout(()=>{
          setSuccessMsg("")
        },3000)
      }).catch((error)=>{
        setError(error.message)
      })
    }
    else{
      setError("You need to login first for add to cart product");
    }
  }

  return (
    <div>
      
      <NaviBar/>
      <p>{id}</p>
      <p>{type}</p>
      {console.log(product)}
      {successMsg}
      {errormsg}
      {product ? 
      <Card className="my-3 p-3 rounded" style={{ width: '14rem' }}>
      <Card.Img variant="top" src={product.productImage} style={{ height: '8rem', objectFit: 'cover' }} />
      <Card.Body>
          <Card.Title as="h6" className="text-center">{product.productTitle}</Card.Title>
          <Row className="justify-content-left">
              <Col xs="auto">
                  <Card.Text className="text-muted">
                      Price: <s>${product.price}</s>
                  </Card.Text>
              </Col>
              <Col xs="auto">
                  <Card.Text className="text-danger font-weight-bold">
                      Discount: ${product.description}
                  </Card.Text>
              </Col>
              <Col xs="auto">
                  <Card.Text className="text-danger font-weight-bold">
                      Discount: ${product.productType}
                  </Card.Text>
              </Col>
              <Col xs="auto">
                  <Card.Text className="text-danger font-weight-bold">
                      Warranty: {product.warranty}
                  </Card.Text>
              </Col>
          </Row>
          <Button variant="primary" className="w-100 mt-2" onClick={addToCart}>
              Add to Cart
          </Button>
          <Button variant="success" className="w-100 mt-2">
              Buy Now
          </Button>

          {/* <Link to={`/product/${props.product.id}/${props.product.productTitle}`}>
              <Button variant="warning" className="w-100 mt-2">
                  Show More
              </Button>
          </Link> */}
      </Card.Body>
  </Card>
      :
      <div>Loading...</div>
      }
      
      <h3>Related Product</h3>
      <ProductSliderHome type={type}/>
    </div>
  )
}

export default SpecificProductPage

