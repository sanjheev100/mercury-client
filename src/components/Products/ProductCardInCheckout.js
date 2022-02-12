import React, { useState } from 'react'
import ModalImage from 'react-modal-image'
import noImage from '../../images/Noimage.png'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const ProductCardInCheckout = ({ product }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(product.count)

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value
    // if (e.target.value < 1) {
    //   return toast.error('Invalid Count')
    // }

    setQuantity(e.target.value)

    let cart = []

    if (e.target.value < 1) {
      toast.error('Minimum Quantity is 1')
    }

    if (e.target.value > product.quantity) {
      toast.error(`Max available quantity is ${product.quantity}`)
      setQuantity(product.quantity)
      return
    }

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('mercuryCart')) {
        cart = JSON.parse(localStorage.getItem('mercuryCart'))
      }

      cart.map((pr, index) => {
        if (pr._id === product._id) {
          cart[index].count = count
        }
      })

      localStorage.setItem('mercuryCart', JSON.stringify(cart))
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }

  const handleRemoveFromCart = () => {
    let cart = []

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('mercuryCart')) {
        cart = JSON.parse(localStorage.getItem('mercuryCart'))
      }

      // eslint-disable-next-line array-callback-return
      cart.map((pr, index) => {
        if (pr._id === product._id) {
          cart.splice(index, 1)
        }
      })

      localStorage.setItem('mercuryCart', JSON.stringify(cart))
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '80px', height: 'auto' }}>
            {product.images.length ? (
              <ModalImage
                small={product.images[0].url}
                large={product.images[0].url}
              />
            ) : (
              <ModalImage small={noImage} large={noImage} />
            )}
          </div>
        </td>
        <td style={{ color: 'white' }}>{product.title}</td>
        <td style={{ color: 'white' }}>₹{product.price}</td>
        <td style={{ color: 'white' }}>{product.brand}</td>
        <td style={{ color: 'white' }} className='text-center'>
          <input
            type='number'
            className='form-control'
            value={quantity}
            onChange={handleQuantityChange}
          />
        </td>
        <td style={{ color: 'white' }} className='text-center'>
          <i
            onClick={handleRemoveFromCart}
            className='far fa-trash-alt text-primary pointer'
          ></i>
        </td>
      </tr>
    </tbody>
  )
}
export default ProductCardInCheckout
