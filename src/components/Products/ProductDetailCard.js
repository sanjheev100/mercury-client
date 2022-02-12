import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from 'react-bootstrap'
import _ from 'lodash'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/ProductDetail.module.css'
import { RatingModal } from '../'
import CarouselDetails from './CarouselDetails'
import { Tabs, Tooltip } from 'antd'
import StarRating from 'react-star-ratings'
import { showAverage } from '../functions/rating'
import { useSelector, useDispatch } from 'react-redux'
import { addToWishList } from '../../api/user'
import { toast } from 'react-toastify'

const { TabPane } = Tabs
const ProductDetailCard = ({ product, onStarClick, star }) => {
  const { _id } = product
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [tooltip, setTooltip] = useState('Click to add')
  const { user, cart } = useSelector((state) => ({ ...state }))

  const handleAddtoCart = () => {
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('mercuryCart')) {
        cart = JSON.parse(localStorage.getItem('mercuryCart'))
      }
    }
    cart.push({
      ...product,
      count: 1,
    })

    let unique = _.uniqWith(cart, _.isEqual)
    // console.log('unique',unique)
    localStorage.setItem('mercuryCart', JSON.stringify(unique))
    setTooltip('Already in Cart')

    //adding cart to redux state
    dispatch({
      type: 'ADD_TO_CART',
      payload: unique,
    })

    dispatch({
      type: 'SET_VISIBLE',
      payload: true,
    })
  }

  const handleAddtoWishlist = (e) => {
    e.preventDefault()
    addToWishList(product._id, user.token).then((res) => {
      console.log(res.data)
      toast.success('Added To Wishlist')
      navigate('/user/wishlist')
    })
  }
  return (
    <>
      <Container>
        <button className='btn btn-primary my-3' onClick={() => navigate(-1)}>
          Go back
        </button>
        <Row>
          <Col md={6}>
            {product && product.images && (
              <CarouselDetails images={product.images} />
            )}
          </Col>

          <Col md={3} className='mt-3'>
            <ListGroup variant='flush'>
              <ListGroup.Item className={styles.listgroupItem}>
                <h3 className='text-center' style={{ color: 'black' }}>
                  {product.title}
                </h3>
              </ListGroup.Item>{' '}
              <ListGroup.Item>
                <Row>
                  {/* <Col>
                    <strong>Rating :</strong>
                  </Col> */}
                  <Col>
                    {' '}
                    {product &&
                    product.ratings &&
                    product.ratings.length > 0 ? (
                      showAverage(product)
                    ) : (
                      <div className='text-center pt-1 pb-3'>
                        <i className='fas fa-heart-broken'></i>
                        {'  '}No Ratings Yet
                      </div>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Price :</strong>
                  </Col>
                  <Col>₹{product.price}</Col>
                </Row>
              </ListGroup.Item>
              {product && product.description && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Description :</strong>
                    </Col>
                    <Col>
                      `{product.description.slice(0, 5)}`
                      <strong>...check Below</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              {product && product.category && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Category :</strong>
                    </Col>
                    <Col>
                      <Link to={`/category/${product?.category.slug}`}>
                        {product && product?.category?.name}
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              {product && product.subCategory && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>SubCategory :</strong>
                    </Col>
                    <Col>
                      {product.subCategory.map((subs) => (
                        <Link to={`/subCategory/${subs.slug}`} key={subs._id}>
                          <ListGroup.Item>
                            <span style={{ color: '#80a7ff' }}>
                              {subs.name}
                            </span>
                          </ListGroup.Item>
                        </Link>
                      ))}
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          {/* <br /> */}

          <Col md={3} className='mt-3'>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Price :</strong>
                    </Col>
                    <Col>₹{product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      {' '}
                      <strong>Status :</strong>
                    </Col>
                    <Col>
                      {product.quantity > 0
                        ? `${product.quantity} left in Stock`
                        : 'Out of Stock'}{' '}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <Tooltip title={tooltip}>
                      <Button
                        type='button'
                        disabled={product.quantity === 0}
                        onClick={handleAddtoCart}
                      >
                        <i
                          className='fa fa-cart-arrow-down'
                          aria-hidden='true'
                        ></i>{' '}
                        {product.quantity === 0
                          ? 'Out of Stock'
                          : 'Add to Cart'}
                      </Button>
                    </Tooltip>
                    <Button type='button'>
                      <a
                        style={{ textDecoration: 'none', color: 'white' }}
                        onClick={handleAddtoWishlist}
                      >
                        <i
                          style={{ textDecoration: 'none', color: 'white' }}
                          className='far fa-heart'
                          aria-hidden='true'
                        ></i>{' '}
                        wishlist
                      </a>
                    </Button>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <RatingModal>
                    <StarRating
                      name={_id}
                      numberOfStars={5}
                      rating={star}
                      changeRating={onStarClick}
                      isSelectable={true}
                      starRatedColor='#c6a633'
                    />
                  </RatingModal>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Tabs type='card' className='mt-3'>
          <TabPane tab='Description' key='1'>
            <span style={{ color: 'white' }}>
              {product && product.description}
            </span>
          </TabPane>
        </Tabs>
      </Container>
    </>
  )
}

export default ProductDetailCard
