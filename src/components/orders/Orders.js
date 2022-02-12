import React from 'react'
import { ShowOrderInfo } from '..'
import { OrderDetailsModal } from '..'

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderTable = (order) => (
    <table className='table table-bordered bg-light'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>title</th>
          <th scope='col'>price</th>
          <th scope='col'>count</th>
          <th scope='col'>brand</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.count}</td>
            <td>{p.product.brand}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <>
      <h4 className='text-white text-center'>ORDERS PAGE</h4>
      {orders.map((order) => (
        <div key={order._id} className='row p-5 text-white '>
          <div className='btn btn-block bg-light'>
            <ShowOrderInfo order={order} showStatus={false} />
            <div className='row'>
              <div
                className='col-md-4'
                style={{ display: 'flex', justifyContent: 'space-evenly' }}
              >
                <OrderDetailsModal>
                  <table className='table table-bordered bg-light'>
                    <tbody className='tbody-light'>
                      <tr>
                        <th scope='col'>Order ID</th>
                        <th scope='col'>{order._id}</th>
                      </tr>
                      <tr>
                        <th scope='col'>email</th>
                        <th scope='col'>{order.orderBy.email}</th>
                      </tr>

                      <tr>
                        <th scope='col'>Customer Id</th>
                        <th scope='col'>{order.orderBy._id}</th>
                      </tr>
                      <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>{order.address[0].name}</th>
                      </tr>
                      <tr>
                        <th scope='col'>Phone</th>
                        <th scope='col'>{order.address[0].number}</th>
                      </tr>
                      <tr>
                        <th scope='col'>city</th>
                        <th scope='col'>{order.address[0].city}</th>
                      </tr>
                      <tr>
                        <th scope='col'>Pincode</th>
                        <th scope='col'>{order.address[0].pincode}</th>
                      </tr>

                      <tr>
                        <th scope='col'>Landmark</th>
                        <th scope='col'>
                          {order.address[0].landmark
                            ? order.address[0].landmark
                            : 'Not Provided'}
                        </th>
                      </tr>

                      {/* <th scope='col'>{order._id}</th> */}
                    </tbody>
                  </table>
                </OrderDetailsModal>{' '}
                Order Status{' '}
              </div>
              <div className='col-md-8'>
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className='form-control'
                  defaultValue={order.orderStatus}
                  name='status'
                >
                  <option value='Ordered'>Ordered</option>
                  <option value='Processing'>Processing</option>
                  <option value='Dispatched'>Dispatched</option>
                  <option value='Cancelled'>Cancelled</option>
                  <option value='Completed'>Completed</option>
                </select>
              </div>
            </div>
          </div>
          {showOrderTable(order)}
        </div>
      ))}
    </>
  )
}
export default Orders
