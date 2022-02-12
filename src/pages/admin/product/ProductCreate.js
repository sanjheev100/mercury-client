import React, { useState, useEffect } from 'react'
import {
  AdminNav,
  FormContainer,
  ProductCreateForm,
  FileUpload,
} from '../../../components'
import { confettishow } from '../../../common/confetti'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createProduct } from '../../../api/product'
import { useNavigate } from 'react-router-dom'
import { getCategories, getCategorySubs } from '../../../api/category'
import { Button, Col, Container, Spinner, Row } from 'react-bootstrap'
import axios from 'axios'
import Avatar from 'react-avatar'

const initialValues = {
  title: 'Ninja',
  description: 'asdsd',
  price: '123',
  categories: [],
  category: '',
  subCategory: [],
  quantity: '123',
  images: [],
  brand: 'asfdsa',
}

const ProductCreate = () => {
  const [values, setValues] = useState(initialValues)
  const [subOptions, setSubOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSub, setShowSub] = useState(false)
  const [imageLoader, setImageLoader] = useState(false)

  //multiselect
  const [field, setField] = useState([])

  const { user } = useSelector((state) => ({ ...state }))

  const navigate = useNavigate()

  useEffect(() => {
    loadAllCategories()
  }, [])

  const loadAllCategories = () => {
    getCategories()
      .then((res) => {
        setValues({ ...values, categories: res.data })
      })
      .catch((err) => {
        toast.error('FETCHING CATEGORY ERROR')
      })
  }

  const handleCategoryChange = (e) => {
    e.preventDefault()
    setValues({ ...values, subCategory: [], category: e.target.value })
    if (e.target.value !== 'Please Select') {
      setShowSub(true)
      getCategorySubs(e.target.value)
        .then((res) => {
          console.log(res.data)
          setSubOptions(res.data)
        })
        .catch((err) => {
          console.log('ERROR IN FETCHING CATEGORY REFRESH')
        })
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    values.subCategory = field
    createProduct(values, user.token)
      .then((res) => {
        toast.success(`${res.data.title} is Created`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setLoading(false)
        window.alert(`${res.data.title} is Created`)
        window.location.reload()
        confettishow()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        toast.error(err.response.data.err, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleRemoveImage = (public_id) => {
    setImageLoader(true)
    axios
      .post(
        `${process.env.REACT_APP_API}/deleteimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        setImageLoader(false)
        const { images } = values
        let filteredImages = images.filter((image) => {
          return image.public_id !== public_id
        })
        setValues({ ...values, images: filteredImages })
      })
      .catch((err) => {
        setImageLoader(false)
        console.log(err)
      })
  }

  return (
    <>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
              <AdminNav />
            </div>
            <div className='col'>
              <Container>
                <Row className='d-flex justify-content-between'>
                  {imageLoader ? (
                    <Spinner animation='border' variant='danger' />
                  ) : (
                    <>
                      {values.images &&
                        values.images.map((image) => (
                          <Col
                            className='mb-3'
                            sm={12}
                            md={6}
                            lg={4}
                            xl={3}
                            key={image.public_id}
                          >
                            <div
                              className='item'
                              style={{
                                position: 'relative',
                                paddingTop: '20px',
                                display: 'inline-block',
                              }}
                            >
                              <span
                                className='notify-badge'
                                style={{
                                  position: 'absolute',
                                  right: '-20px',
                                  top: '10px',
                                  background: 'red',
                                  textAlign: 'center',
                                  borderRadius: '30px',
                                  color: 'white',
                                  padding: '5px 10px',
                                  fontSize: '20px',
                                  cursor: 'pointer',
                                }}
                                onClick={() =>
                                  handleRemoveImage(image.public_id)
                                }
                              >
                                X
                              </span>
                              <Avatar round={true} src={image.url} />
                            </div>
                          </Col>
                        ))}
                    </>
                  )}
                </Row>
              </Container>
              <FormContainer>
                <h2 className='text-center' style={{ color: 'white' }}>
                  PRODUCT CREATE
                </h2>
                <br />
                <FileUpload
                  values={values}
                  setValues={setValues}
                  setImageLoader={setImageLoader}
                />{' '}
                <br />
                <ProductCreateForm
                  values={values}
                  submitHandler={submitHandler}
                  handleChange={handleChange}
                  handleCategoryChange={handleCategoryChange}
                  subOptions={subOptions}
                  showSub={showSub}
                  setValues={setValues}
                  setField={setField}
                  field={field}
                />
              </FormContainer>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCreate
