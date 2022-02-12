import React, { useState } from 'react'
import { Modal, Tooltip } from 'antd'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
const OrderDetailsModal = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleModal = () => {
    setModalVisible(true)
  }
  return (
    <>
      <div onClick={handleModal}>
        <Tooltip title={'click to view customer details'}>
          <i className='fas fa-eye'></i>
        </Tooltip>
      </div>
      <Modal
        title='Customer Details'
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false)
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  )
}

export default OrderDetailsModal
