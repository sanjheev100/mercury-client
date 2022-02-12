import React, { useState } from 'react'
import { Modal, Tooltip } from 'antd'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { updateProductCount } from '../../api/product'
const ProductCountUpdateModal = ({ product, loadAllProducts }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const [modalVisible, setModalVisible] = useState(false)
  const [newQuantity, setNewQuantity] = useState(0)

  const handleQuantityChange = (id, newQuantity) => {
    if (product.quantity == newQuantity) {
      return setModalVisible(false)
    }

    if (newQuantity < 0) {
      return toast.error('Cannot Update Quantity in Negative')
    }

    updateProductCount(id, newQuantity, user.token)
      .then((res) => {
        toast.success('Quantity Updated')
        setModalVisible(false)
        loadAllProducts()
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  return (
    <>
      {/* <div onClick={setModalVisible(true)}> */}
      <Tooltip title={'click to view/update product count'} placement='bottom'>
        <i
          className='fas fa-edit pointer'
          onClick={() => setModalVisible(true)}
        ></i>
      </Tooltip>
      <Modal
        title='Update Product Count'
        centered
        visible={modalVisible}
        onOk={() => {
          handleQuantityChange(product._id, newQuantity)
        }}
        onCancel={() => setModalVisible(false)}
      >
        <table className='table table-bordered bg-light'>
          <tbody className='tbody-ligth'>
            <tr>
              <th scope='col'>Product Title</th>
              <td scope='col'>{product.title}</td>
            </tr>
            <tr>
              <th scope='col'>Description</th>
              <td scope='col'>{product.description}</td>
            </tr>
            <tr>
              <th scope='col'>Price</th>
              <td scope='col'>{product.price}</td>
            </tr>
            <tr>
              <th scope='col'>Product Count</th>
              <td scope='col'>{product.quantity} Left</td>
            </tr>
            <tr>
              <th scope='col'>Product Sold</th>
              <td scope='col'>{product.sold}</td>
            </tr>
            <tr>
              <th scope='col'>Category</th>
              <td scope='col'>{product.category.name}</td>
            </tr>
            {product.subCategory && (
              <tr>
                <th scope='col'>SubCategory</th>
                {product.subCategory.map((sub) => (
                  <td scope='col'>{sub.name}</td>
                ))}
              </tr>
            )}
            <tr>
              <th scope='col'>Update Count</th>
              <td scope='col'>
                <input
                  type='number'
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </>
  )
}

export default ProductCountUpdateModal
