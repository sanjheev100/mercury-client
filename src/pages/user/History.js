import React, { useState, useEffect } from 'react'
import { UserNav, ShowOrderInfo } from '../../components'
import { getUserOrders } from '../../api/user'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const History = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector((state) => ({ ...state }))

  const navigate = useNavigate()
  useEffect(() => {
    loadUserOrders()
  }, [])

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4))
      setOrders(res.data)
    })
  }

  const showOrderTable = (order) => (
    <table className='table table-bordered'>
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

  const showEachOrder = () =>
    orders.map((order, i) => (
      <div key={i} className='m-5 p-3 card'>
        <ShowOrderInfo order={order} />
        {showOrderTable(order)}
      </div>
    ))
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>
          <h4 className='text-center mytext-white'>
            {orders.length ? 'User Purchase History' : 'No Purchases yet'}
          </h4>
          {showEachOrder()}
        </div>
      </div>
    </div>
  )
}

export default History
