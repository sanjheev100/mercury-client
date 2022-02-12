import React, { useEffect, useState } from 'react'
import { AdminNav, AdminProductCard, FormContainer } from '../../../components'
import { getProductsByCount, deleteProduct } from '../../../api/product'
import { Col, Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount()
      .then((res) => {
        setLoading(false)
        setProducts(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const handleRemove = (slug) => {
    if (window.confirm(`are you sure wanna delete ${slug}?`)) {
      console.log(slug)
      deleteProduct(slug, user.token)
        .then((res) => {
          loadAllProducts()
          toast.error(`${res.data.title} is deleted`)
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.response.data)
        })
    }
  }

  return (
    <Container className='container-fluid'>
      <div className='row'>
        {/* <div className='col-md-2'> */}
        <AdminNav />
        <FormContainer>
          {/* <form className='d-flex'>
            <input
              className='form-control me-sm-2'
              type='text'
              placeholder='Search'
            ></input>
          </form> */}
        </FormContainer>
        {/* </div> */}
        {/* lodercomponent */}
        {loading ? (
          <h4 className='text-white text-center'>loading</h4>
        ) : (
          <>
            <h1 className='text-center' style={{ color: 'white' }}>
              All Products
            </h1>
            <Row>
              {products.map((product) => (
                <Col
                  key={product._id}
                  className='mb-3'
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <AdminProductCard
                    handleRemove={handleRemove}
                    product={product}
                    loadAllProducts={loadAllProducts}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </Container>
  )
}

export default Products
