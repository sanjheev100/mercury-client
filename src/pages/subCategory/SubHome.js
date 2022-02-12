import React, { useState, useEffect } from 'react'
import { getSubCategory } from '../../api/subCategory'
import { useParams } from 'react-router-dom'
import { ProductCard } from '../../components'
import { Container } from 'react-bootstrap'

const SubHome = () => {
  const { slug } = useParams()
  const [sub, setSub] = useState({})
  const [loading, setLoading] = useState(false)
  const [product, setProducts] = useState([])

  useEffect(() => {
    setLoading(true)
    getSubCategory(slug)
      .then((res) => {
        setLoading(false)
        setSub(res.data.subCategory)
        setProducts(res.data.products)
      })
      .catch((err) => {
        setLoading(false)
      })
  }, [])

  return (
    <Container>
      <div className='row'>
        <div className='col'>
          {loading ? (
            <h4
              style={{ color: 'white' }}
              className='text-center p-3 mt-5 mb-5 display-4'
            >
              Loading
            </h4>
          ) : (
            <h4
              style={{ color: 'white' }}
              className='text-center p-3 mt-5 mb-5 display-4'
            >
              {product.length} Products in "{sub.name}" Sub Category
            </h4>
          )}
        </div>
      </div>
      <div className='row'>
        {product &&
          product.map((prod) => (
            <div className='col-md-4' key={prod._id}>
              <ProductCard product={prod} />
            </div>
          ))}
      </div>
    </Container>
  )
}

export default SubHome
