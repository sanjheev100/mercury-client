import React from 'react'
import { useSelector } from 'react-redux'
const ShowOrderInfo = ({ order, showStatus = true }) => {
  const { user } = useSelector((state) => ({ ...state }))
  return (
    <div>
      <p>
        <span>
          <b>Order Id </b>: {order._id}
        </span>{' '}
        {' / '}{' '}
        {user && user.role === 'admin' && (
          <>
            <span>
              <b>Ordered By</b> : {order.orderBy.email}
            </span>
            {' / '}{' '}
          </>
        )}
        <span>
          <b>Total Amount</b> : ₹{order.totalOrderAmount}
        </span>
        {' / '}
        <span>
          <b>Ordered On</b> : {new Date(order.createdAt).toLocaleString()}
        </span>
        {' / '}
        <br />
        {showStatus && (
          <span className='badge bg-primary text-white'>
            <b>Status</b> : {order.orderStatus}
          </span>
        )}
      </p>
    </div>
  )
}

export default ShowOrderInfo
