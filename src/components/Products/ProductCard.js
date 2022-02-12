import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { showAverage } from '../functions/rating'
import './UserProductCard.css'
import { Tooltip } from 'antd'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

const ProductCard = ({ product }) => {
  const { images } = product
  const [tooltip, setTooltip] = useState('Click to add')

  const dispatch = useDispatch()

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

  return (
    <>
      <Card className='mb-3  p-3 shadow-lg p-3 mb-5 bg-white rounded'>
        <Card.Title>
          {product && product.ratings && product.ratings.length > 0 ? (
            <div style={{ color: 'black' }}>{showAverage(product)}</div>
          ) : (
            <div className='text-center pt-1 pb-3' style={{ color: 'black' }}>
              <i className='fas fa-heart-broken'></i>
              {'  '}No Ratings Yet
            </div>
          )}
        </Card.Title>
        <Link to={`/product/${product.slug}`}>
          {/* <Card.Img
            style={{
              height: '300px',
              width: '350px',
              objectFit: 'contain',
            }}
            src={
              images && images.length
                ? images[0].url
                : `https://res.cloudinary.com/duigjlhf8/image/upload/v1642846803/No_image_kztd4b.png`
            }
            variant='top'
          /> */}
          <Card.Img
            src={
              images && images.length
                ? images[0].url
                : `https://res.cloudinary.com/duigjlhf8/image/upload/v1642846803/No_image_kztd4b.png`
            }
            variant='top'
            style={{ height: '180px', objectFit: 'contain' }}
            className='m-2'
          />
        </Link>
        <Card.Body
          style={{ backgroundColor: '#cde3f0' }}
          className='text-center'
        >
          <Link to={`/product/${product.slug}`}>
            <Card.Title as='div' style={{ color: 'black' }}>
              <strong>{product.title}</strong>
            </Card.Title>
          </Link>

          <br />
          <Card.Text as='h3' style={{ color: 'black' }}>
            {' '}
            <div
              className='d-flex justify-content-center'
              style={{ display: 'flex' }}
            >
              <p style={{ fontSize: '20px' }}>₹{product.price} Per Unit</p>{' '}
              &nbsp;&nbsp;&nbsp;{' '}
              <Tooltip title={product.quantity == 0 ? 'Out Of Stock' : tooltip}>
                <Button
                  style={{
                    width: '70px',
                    height: '40px',

                    borderRadius: 70,
                  }}
                  onClick={handleAddtoCart}
                  disabled={product.quantity < 1}
                >
                  {' '}
                  {product.quantity < 1 ? (
                    <i className='fas fa-times'></i>
                  ) : (
                    <i className='fa fa-cart-arrow-down' aria-hidden='true'></i>
                  )}
                </Button>{' '}
              </Tooltip>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductCard
