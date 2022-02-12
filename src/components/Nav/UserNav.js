import React from 'react'
import { Link } from 'react-router-dom'
const UserNav = () => {
  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item mb-2'>
          <Link
            style={{ textDecoration: 'none' }}
            className='nav-link'
            to='/user/history'
          >
            <h3 className='text-white'>History</h3>
          </Link>
        </li>
        <li className='nav-item  mb-2'>
          <Link
            style={{ textDecoration: 'none' }}
            className='nav-link'
            to='/user/password'
          >
            <h3 className='text-white'>Password</h3>
          </Link>
        </li>
        <li className='nav-item  mb-2'>
          <Link
            style={{ textDecoration: 'none' }}
            className='nav-link'
            to='/user/wishlist'
          >
            <h3 className='text-white'>Wishlist</h3>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
