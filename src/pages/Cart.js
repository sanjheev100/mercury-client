import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ProductCardInCheckout } from '../components'
import { userCart } from '../api/user'
import { toast } from 'react-toastify'
const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const saveOrderToDb = () => {
    if (user.isBlocked === true) {
      toast.error('You are Restricted from placcing Order,Contact Admin')
    } else {
      userCart(cart, user.token)
        .then((res) => {
          console.log('CART DB response', res)
          if (res.data.ok) {
            navigate('/checkout')
          }
        })
        .catch((err) => {
          console.log('CART SAVE ERROR', err)
          toast.error('CHECK CONSOLE FOR ERROR')
        })
    }
  }

  const showCartItems = () => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Count</th>
          <th scope='col'>Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} product={p} />
      ))}
    </table>
  )

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8'>
          <h4>{cart.length} items in the Cart </h4>

          {!cart.length ? (
            <p>
              No Products in the cart <Link to='/'>Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className='col-md-4'>
          <h4>
            Order Summary <hr />
            <p>Products</p>
            {cart.map((c, i) => (
              <div key={i}>
                <h5>
                  {c.title} * {c.count} = ₹{c.price * c.count}
                </h5>
              </div>
            ))}
            <hr />
            Total : <b>₹{getTotal()}</b>
            <hr />
            {user ? (
              <Button
                style={{ textDecoration: 'none' }}
                disabled={cart.length < 1}
                onClick={saveOrderToDb}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <Button>
                <Link
                  to={{
                    pathname: '/login',
                    state: { from: 'cart' },
                  }}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Login to Checkout
                </Link>
              </Button>
            )}
          </h4>
        </div>
      </div>
    </div>
  )
}
export default Cart
