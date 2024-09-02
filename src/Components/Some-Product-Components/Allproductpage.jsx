import React, { useEffect, useState } from 'react'
import NaviBar from '../NaviBar'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../FirebaseConfigs/firebaseConfig'
import Productcontainer from './Productcontainer'
import { Col, Container, Row } from 'react-bootstrap'

const Allproductpage = (props) => {

    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = () => {
            const productArray = [];
            const path = `products-${props.type.toUpperCase()}`;
            // console.log(path)

            getDocs(collection(db, path)).then((querySnap) => {
                querySnap.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id })
                    // console.log(doc.id,"->", doc.data())
                })
                setProducts(productArray)
            }).catch((error) => { console.log(error.message) })
        }
        getProducts()
    }, [props.type])

    // console.log(props.type)
    return (
        <div>
            <NaviBar />
            <h3 className='text-center mt-2'>Top Results for {props.type}</h3>


            <Container >
                <Row className="justify-content-left">
                    {products.map((prod) => (
                        <Col key={prod.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-left mb-4">
                        <Productcontainer key={prod.id} product={prod} />
                        </Col>
                    ))}
                </Row>

            </Container>







        </div>
    )
}

export default Allproductpage