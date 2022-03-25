import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {
  getUserCart,
  emptyCart,
  saveUserAddress,
  createOrder,
} from '../api/user'
import { toast } from 'react-toastify'
import { AddressForm } from '../components'
import { confettishow } from '../common/confetti'
import { useNavigate } from 'react-router-dom'
const initialState = {
  name: '',
  number: '',
  street: '',
  city: '',
  landmark: '',
  pincode: '',
  flatNumber: '',
}
const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => ({ ...state }))
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [addressSaved, setAddressSaved] = useState(false)
  const [values, setValues] = useState(initialState)

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products)
      setTotal(res.data.cartTotal)
    })
    toast.success('Currently We are Delivering Product Only at 453441', {
      position: 'top-center',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }, [])

  const clearCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mercuryCart')
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    })
    emptyCart(user.token).then((res) => {
      setProducts([])
      setTotal(0)
      toast.error('Cart is empty contine shipping')
    })
  }

  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

  const saveAddressToDb = () => {
    if (
      !values.name ||
      !values.city ||
      !values.street ||
      !values.number ||
      !values.pincode
    ) {
      return toast.error('Except Landmark,All are required Fields')
    }

    if (!phoneRegex.test(values.number)) {
      return toast.error('Enter a Valid Phone Number wihtout country code')
    }

    if (user.isBlocked === true) {
      return toast.error('You are restricted from this website,contact Admin')
    }

    saveUserAddress(user.token, values).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true)
        toast.success('Address Saved')
      }
    })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleNewOrder = () => {
    if (user.isBlocked === true) {
      return toast.error('You are restricted from this website,contact Admin')
    }
    createOrder(user.token).then((res) => {
      if (res.data.ok) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('mercuryCart')
        }
        confettishow()
        dispatch({
          type: 'ADD_TO_CART',
          payload: [],
        })
        emptyCart(user.token)
        navigate('/')
      }
    })
  }

  return (
    <div className='row'>
      <div className='col-md-6'>
        <br />
        <br />
        <Container>
          <h4 className='text-center'>Delivery Address</h4>

          <AddressForm values={values} handleChange={handleChange} />
          <Button onClick={saveAddressToDb}>Save</Button>
        </Container>
      </div>
      <div className='col-md-6'>
        <h4>Order Summary</h4>
        <hr />
        <h5>Total {products.length} in Cart</h5>
        <hr />
        {products.map((p, index) => (
          <div key={index}>
            <h5>
              {p.product.title} x {p.count} = {p.product.price * p.count}{' '}
            </h5>
          </div>
        ))}
        <hr />
        <h5>Cart Total : {total}</h5>
        <div className='row'>
          <div className='col-md-6'>
            <Button
              disabled={!addressSaved || !products.length}
              onClick={handleNewOrder}
            >
              Place Order
            </Button>
          </div>
          <div className='col-md-6'>
            <Button disabled={!products.length} onClick={clearCart}>
              Empty Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
