import React, { useState, useEffect } from 'react'
import {
  ProductCarousel,
  NewArrivals,
  BestSellers,
  CategoryList,
  SubList,
} from '../components'
import {
  getProductsByCount,
  getNewArrivals,
  getProductswithCustom,
} from '../api/product'
import { confettishow } from '../common/confetti'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Home = () => {
  const navigate = useNavigate()

  const loadAllProducts = () => {
    setLoading(true)
    getProductswithCustom('createdAt', 'desc', page)
      .then((res) => {
        setLoading(false)
        setProducts(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadAllProducts()
  }, [page])

  useEffect(() => {
    loadFeaturedProduct()
  }, [])

  const featuredperPage = 3
  const featuredPage = 1
  const loadFeaturedProduct = () => {
    getProductswithCustom('quantity', 'desc', featuredPage, featuredperPage)
      .then((res) => {
        setFeatured(res.data)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  var screenWidth = window.innerWidth
  return (
    <>
      <div
        className='h1 font-weight-bold d-flex align-items-center justify-content-center '
        style={{
          height: '100px',
          backgroundColor:
            'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
          color: 'white',
        }}
      >
        <h1 style={{ color: 'white' }} onClick={() => confettishow()}>
          Mercury Mega Mart
        </h1>
      </div>
      <br />
      <ProductCarousel newlyAddedproducts={featured} />
      <NewArrivals />
      <br />
      <BestSellers />
      <br />
      <br />
      <br />
      <CategoryList />

      <br />
      <br />
      <br />
      <SubList />
    </>
  )
}

export default Home
