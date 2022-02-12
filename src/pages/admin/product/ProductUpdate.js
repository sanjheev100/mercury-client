import React, { useState, useEffect } from 'react'
import {
  AdminNav,
  FormContainer,
  ProductUpdateForm,
  FileUpload,
} from '../../../components'
import { confettishow } from '../../../common/confetti'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getProductDetails, updateProduct } from '../../../api/product'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategories, getCategorySubs } from '../../../api/category'
import { Button, Col, Container, Spinner, Row } from 'react-bootstrap'
import axios from 'axios'
import Avatar from 'react-avatar'

const initialValues = {
  title: '',
  description: '',
  price: '',
  category: '',
  subCategory: [],
  quantity: '',
  images: [],
  brand: '',
}

const ProductUpdate = () => {
  const [values, setValues] = useState(initialValues)
  const [subOptions, setSubOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSub, setShowSub] = useState(false)
  const [imageLoader, setImageLoader] = useState(false)
  const [categories, setCategories] = useState([])
  const [arrayofSubIds, setArrayofSubIds] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [PreviouslySubs, setPreviouslySubs] = useState([])

  var list = []

  if (PreviouslySubs) {
    PreviouslySubs.map((p) => list.push(p._id))
  }

  // console.log(list)

  const navigate = useNavigate()
  let { slug } = useParams()

  useEffect(() => {
    loadAllCategories()
    loadSingleProduct()
  }, [])

  const loadAllCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data)
      })
      .catch((err) => {
        toast.error('FETCHING CATEGORY ERROR')
      })
  }

  const loadSingleProduct = () => {
    setLoading(true)
    getProductDetails(slug)
      .then((res) => {
        setLoading(false)
        setValues({ ...values, ...res.data })
        setPreviouslySubs(res.data.subCategory)
        getCategorySubs(res.data.category._id).then((resp) => {
          // console.log('asdsadsa', resp.data)
          setSubOptions(resp.data) //on firstLoad
        })
        let arr = []
        res.data.subCategory.map((s) => {
          arr.push(s._id)
        })
        setArrayofSubIds((prev) => arr)
        // console.log('AR***************', arr)
      })
      .catch((error) => {
        setLoading(false)
        // console.log(error.response.data)
      })
  }

  // console.log('subop', subOptions)

  //multiselect
  const [field, setField] = useState([])

  const { user } = useSelector((state) => ({ ...state }))

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
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    if (field.length == 0) {
      values.subCategory = list
    } else {
      values.subCategory = field
    }
    if (selectedCategory) {
      values.category = selectedCategory
    } else {
      values.category = values.category._id
    }

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false)
        confettishow()
        toast.success(`${res.data.title} is Updated`)
        navigate(-1)
      })
      .catch((err) => {
        toast.error(err.response.data.err)
      })
  }

  const handleCategoryChange = (e) => {
    e.preventDefault()
    // console.log(e.target.value)
    setValues({ ...values, subCategory: [] })

    setSelectedCategory(e.target.value)

    if (e.target.value !== 'Please Select') {
      setShowSub(true)
      getCategorySubs(e.target.value)
        .then((res) => {
          // console.log(res.data)
          setSubOptions(res.data)
        })
        .catch((err) => {
          console.log('ERROR IN FETCHING CATEGORY REFRESH')
        })
    }

    if (values.category._id === e.target.value) {
      loadSingleProduct()
      toast.error('Same Category Choosed')
    }
  }

  return (
    <>
      {loading ? (
        <h3 className='text-white text-center'>Loading</h3>
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
                  PRODUCT UPDATE
                </h2>
                {/* {JSON.stringify(values)} */}
                <br />
                <FileUpload
                  values={values}
                  setValues={setValues}
                  setImageLoader={setImageLoader}
                />{' '}
                <br />
                <ProductUpdateForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  setValues={setValues}
                  values={values}
                  handleCategoryChange={handleCategoryChange}
                  subOptions={subOptions}
                  showSub={showSub}
                  setField={setField}
                  field={field}
                  categories={categories}
                  arrayofSubIds={arrayofSubIds}
                  setArrayofSubIds={setArrayofSubIds}
                  selectedCategory={selectedCategory}
                />
              </FormContainer>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductUpdate
