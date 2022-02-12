import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { updateProductCount } from '../../api/product'
import { useSelector } from 'react-redux'
import { Badge, Modal, Tooltip } from 'antd'
import ProductCountUpdateModal from '../Modal/ProductCountUpdateModal'
const AdminProductCard = ({ product, handleRemove, loadAllProducts }) => {
  const { title, description, price, images, quantity, sold } = product

  return (
    <div>
      <Card className='my-3 p-3 rounded'>
        <Link to={`/admin/product/${product.slug}`}>
          <Card.Img
            src={
              images && images.length
                ? images[0].url
                : `https://res.cloudinary.com/duigjlhf8/image/upload/v1642846803/No_image_kztd4b.png`
            }
            variant='top'
            style={{ height: '150px', objectFit: 'contain' }}
            className='m-2'
          />
        </Link>
        <Card.Body>
          <Link to={`/admin/product/${product.slug}`}>
            <Card.Title as='div' style={{ color: 'black' }}>
              <strong>{product.title}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
            <div className='my-3'>{`${
              description && description.substring(0, 15)
            }...`}</div>
          </Card.Text>

          <Card.Text as='p' style={{ color: 'black' }}>
            {' '}
            {quantity} left in Stock , {sold} units sold
          </Card.Text>

          <Card.Text as='h5' style={{ color: 'black' }}>
            {' '}
            ₹{price} &nbsp;&nbsp;&nbsp;
            <Button onClick={() => handleRemove(product.slug)}>Delete</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <ProductCountUpdateModal
              product={product}
              loadAllProducts={loadAllProducts}
            >
              <h4>ninja</h4>
            </ProductCountUpdateModal>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AdminProductCard
