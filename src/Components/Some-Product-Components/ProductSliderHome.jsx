import React, { useEffect, useState } from 'react'
import NaviBar from '../NaviBar'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../FirebaseConfigs/firebaseConfig'
import Productcontainer from './Productcontainer'
import { Col, Container, Row } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SliderProductCard from './SliderProductCard'

const ProductSliderHome = (props) => {

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


    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    }

    return (
        <div>

            <Carousel responsive={responsive}>
                {products.map((product)=>(
                    <SliderProductCard key={product.id} product={product}/>
                ))}
                {/* <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
                <div>Item 5</div> */}
            </Carousel>

        </div>
    )
}

export default ProductSliderHome


