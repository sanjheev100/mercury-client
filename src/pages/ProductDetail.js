import React, { useState, useEffect } from 'react'
import { getProductDetails, productStar } from '../api/product'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ProductCard, ProductDetailCard } from '../components'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getRelatedProduct } from '../api/product'
const ProductDetail = () => {
  const [product, setProduct] = useState([])
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(false)
  const [star, setStar] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  const { slug } = useParams()

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadSingleProduct()
  }, [slug])

  useEffect(() => {
    if (product.ratings && user) {
      var existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() == user._id.toString()
      )

      existingRatingObject && setStar(existingRatingObject.star)
    }
  })

  const loadSingleProduct = () => {
    setLoading(true)
    getProductDetails(slug)
      .then((res) => {
        setLoading(false)
        setProduct(res.data)
        //loading related
        getRelatedProduct(res.data._id).then((res) => {
          setRelated(res.data)
          // console.log('************', res.data)
        })
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err)
      })
  }

  const onStarClick = (newRating, name) => {
    if (!newRating) {
      return toast.error('Cannot Submit Empty Rating')
    }
    setStar(newRating)
    productStar(name, newRating, user.token)
      .then((res) => {
        loadSingleProduct()
        toast.success('Thanks For giving Rating')
      })
      .catch((err) => {
        console.log(err)
      })
    // console.log(newRating, name)
  }

  return (
    <>
      {loading ? (
        <h4>Loading</h4>
      ) : (
        <>
          <div>
            <ProductDetailCard
              product={product}
              onStarClick={onStarClick}
              star={star}
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
            />
          </div>
          <br />
          <br />
          <br />
          <br />
          <Container>
            <Row className='p-5'>
              <Col className='text-center pt-5 pb-5'>
                <h3 style={{ color: 'white' }}>Related Products</h3>
              </Col>
            </Row>
            <div className='row pb-5'>
              {related.length ? (
                related.map((relProd) => (
                  <div key={relProd._id} className='col-md-4'>
                    <ProductCard product={relProd} />
                  </div>
                ))
              ) : (
                <div className='text-center col'>NO RELATED PRODUCTS FOUND</div>
              )}
            </div>
          </Container>
        </>
      )}
    </>
  )
}

export default ProductDetail
