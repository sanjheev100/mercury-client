import React, { useState } from 'react'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const [modalVisible, setModalVisible] = useState(false)

  const navigate = useNavigate()
  const { slug } = useParams()
  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true)
    } else {
      navigate('/login')
    }
  }
  return (
    <>
      <div onClick={handleModal}>
        <Button className='btn btn-primary w-100'>
          {' '}
          <i className='far fa-star'></i>
          {user ? 'Leave Rating' : 'Login to Leave Rating'}
        </Button>
      </div>
      <Modal
        title='Rating'
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

export default RatingModal
