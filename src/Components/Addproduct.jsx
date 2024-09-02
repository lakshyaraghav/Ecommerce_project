import React, { useEffect, useState } from 'react'
import NaviBar from './NaviBar'
import { auth, db, storage } from '../FirebaseConfigs/firebaseConfig'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const Addproduct = () => {

    const [user, setUser] = useState({})
    const [productTitle, setProductTitle] = useState('')
    const [productType, setProductType] = useState('')
    const [brand, setBrand] = useState('')
    const [customerSupport, setCustomerSupport] = useState('')
    const [price, setPrice] = useState('')
    const [warranty, setWarranty] = useState('')
    const [description, setDescription] = useState('')
    const [productImage, setProductImage] = useState('')

    const [successMsg, setSuccessMsg] = useState('')
    const [uploadError, setUploadError] = useState('')
    const [imageError, setImageError] = useState('')

    useEffect(() => {
        auth.onAuthStateChanged(userlogged => {
            if (userlogged) {
                const getUsers = async () => {
                    const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
                    // console.log(q)
                    const data = await getDocs(q)
                    const userdetail = data.docs[0].data()
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


    const types = ['image/jpg', 'image/png', 'image/PNG', 'image/jpeg']

    const handleProductImg = (e) => {
        e.preventDefault();

        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setProductImage(selectedFile)
                setImageError('')
            }
            else {
                setProductImage(null)
                setImageError("your uploaded file is not in valid format(png and jpg)")
            }
        }
        else {

            setImageError("please select your file")
        }

    }

    const handleAddProduct = (e) => {
        e.preventDefault()
        const storageRef = ref(storage, `product-images${productType.toUpperCase()}/${Date.now()}`)

        uploadBytes(storageRef, productImage).then(() => {
            getDownloadURL(storageRef).then(url => {
                addDoc(collection(db, `products-${productType.toUpperCase()}`), {
                    productTitle,
                    productType,
                    description,
                    brand,
                    customerSupport,
                    price,
                    warranty,
                    productImage: url
                }).then(() => {

                    setSuccessMsg('Data is saved successfully')
                    setProductTitle('');
                    setProductType('');
                    setDescription('');
                    setBrand('');
                    setCustomerSupport('');
                    setPrice('');
                    setWarranty('');
                    setProductImage('');
                    setTimeout(()=>{
                        setSuccessMsg('');
                    },3000)
                }).catch((error) => { setUploadError(error.message) })

            })
        })
    }


    return (
        <div>
            <NaviBar />
            {Object.keys(user).length > 0 && user.email === "raghavtest23@gmail.com" ?
                <div>
                    <h1 className='text-center'>Welcome</h1>
                    <Container className="mt-5 login-container">

                        {/* <h5 className="text-center text-danger">{successMsg}</h5>
                        <h5 className="text-center text-danger">{errMsg}</h5> */}
                        <Row className="justify-content-md-center">
                            <Col md={6}>
                                <h4 className='text-center text-white bg-dark'>Add Data</h4>

                                <Form onSubmit={handleAddProduct}>
                                    <Form.Group className="mb-2" controlId="formBasicTitile">
                                        <Form.Label>Product Title</Form.Label>
                                        <Form.Control type="text" placeholder="Enter product title" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="formBasicType">
                                        <Form.Label>Product Type</Form.Label>
                                        {/* <Form.Control type="text" placeholder="Enter product type" value={productType} onChange={(e) => setProductType(e.target.value)} /> */}
                                        <Form.Select aria-label="Default select example" value={productType} onChange={(e) => setProductType(e.target.value)}>
                                            <option>Open this select menu</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="laptop">Laptop</option>
                                            <option value="shoes">Shoes</option>
                                            <option value="camera">Camera</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="formBasicBrand">
                                        <Form.Label>Product Brand</Form.Label>
                                        <Form.Control type="text" placeholder="Enter product brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="formBasicSupport">
                                        <Form.Label>Costumer Support</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Costumer Support" value={customerSupport} onChange={(e) => setCustomerSupport(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="formBasicPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" placeholder="Enter product price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="formBasicWarranty">
                                        <Form.Label>Warranty</Form.Label>
                                        <Form.Control type="text" placeholder="Enter product warranty" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="formBasicDesc">
                                        <Form.Label>Product Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter product description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="formBasicImage">
                                        <Form.Label>Upload Image</Form.Label>
                                        <Form.Control type="file" placeholder="Upload Image" onChange={handleProductImg} />
                                        {imageError && <><div className='text-danger'>{imageError}</div></>}
                                    </Form.Group>

                                    <Button variant="primary" type="submit" >
                                        Submit
                                    </Button>
                                    {successMsg && <div className='text-danger'>{successMsg}</div>}
                                    {uploadError && <div className='text-danger'>{uploadError}</div>}
                                </Form>

                            </Col>
                        </Row>
                    </Container>
                </div>


                :
                <h1>You don't have access of this page</h1>
            }
            Addproduct
        </div>
    )
}

export default Addproduct