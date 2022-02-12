import React, { useState, useEffect } from 'react'
import { UserNav } from '../../components'
import { getWishlist, removeFromWishlist } from '../../api/user'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = () => {
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist)
    })
  }

  const handleRemove = (productId) => {
    removeFromWishlist(productId, user.token).then((res) => {
      loadWishlist()
      toast.success('removed from wishlist')
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>
          <h4 className='text-white text-center'>WishList</h4>{' '}
          {wishlist.map((w) => (
            <div key={w._id} className='alert alert-secondary'>
              <Link to={`/product/${w.slug}`}>{w.title}</Link>
              <span
                style={{ float: 'right' }}
                className='btn btn-sm ms-auto py-sm-2'
                onClick={() => handleRemove(w._id)}
              >
                <i className='far fa-trash-alt'></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
