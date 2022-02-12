import React, { useEffect, useState } from 'react'
import { AdminNav, Orders } from '../../components'
import { getOrders, changeStatus } from '../../api/admin'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
const AdminDashboard = () => {
  const { user } = useSelector((state) => ({ ...state }))

  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadAllOrders()
  }, [])

  const loadAllOrders = () => {
    getOrders(user.token).then((res) => {
      setOrders(res.data)
      console.log(JSON.stringify(res.data, null, 4))
    })
  }

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success('Status Updated')
      loadAllOrders()
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
