import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ProductCard, SkeletonLoader } from '../index'
import { getProductswithCustom, productsCount } from '../../api/product'
import Typewriter from 'typewriter-effect'
import { useNavigate } from 'react-router-dom'
import { Pagination } from 'antd'
const NewArrivals = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalProductCount, setTotalProductCount] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    productsCount().then((res) => {
      setTotalProductCount(res.data)
    })
  }, [])

  const perPage = 3

  const loadAllProducts = () => {
    setLoading(true)
    getProductswithCustom('createdAt', 'desc', page, perPage)
      .then((res) => {
        setLoading(false)
        setProducts(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  useEffect(() => {
    loadAllProducts()
  }, [page])

  var screenWidth = window.innerWidth

  return (
    <>
      {loading ? (
        <Container className='d-flex justify-content-center'>
          <SkeletonLoader />
        </Container>
      ) : (
        <>
          <br />
          <div
            className='h1 font-weight-bold d-flex align-items-center justify-content-center '
            style={{
              height: '100px',
              backgroundColor:
                'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
            }}
          >
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString('<span>New Arrivals</span>')
                  .pauseFor(2500)
                  .deleteAll()
                  .start()
              }}
            />
          </div>
          <Container>
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}
                xs={3}
              >
                {screenWidth > 1004 ? (
                  <>
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                  </>
                ) : (
                  <>
                    <SkeletonLoader /> <br />
                    <SkeletonLoader /> <br />
                    <SkeletonLoader />
                  </>
                )}
              </div>
            ) : (
              <Row>
                {products.map((p) => (
                  <Col md={4} sm={6} key={p._id}>
                    <ProductCard product={p} />
                  </Col>
                ))}
              </Row>
            )}
            <Row>
              <nav className='col-md-4 offset-md-4 text-center pt-2 p-3'>
                <Pagination
                  current={page}
                  total={Math.ceil(totalProductCount / 3) * 10}
                  onChange={(value) => setPage(value)}
                  showSizeChanger={false}
                />
              </nav>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default NewArrivals
