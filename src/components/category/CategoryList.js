import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { getCategories } from '../../api/category'
import { Button, Container } from 'react-bootstrap'

const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const [categoryLoading, setCategoryLoading] = useState(false)

  useEffect(() => {
    setCategoryLoading(true)
    getCategories()
      .then((res) => {
        setCategoryLoading(false)
        setCategories(res.data)
      })
      .catch((err) => {
        setCategoryLoading(false)
        toast.error(err)
      })
  }, [])

  const showCategories = () =>
    categories.map((cat) => (
      <Button
        key={cat._id}
        variant='secondary'
        className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'
      >
        <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
      </Button>
    ))

  return (
    <Container>
      <div className='row'>
        {categoryLoading ? (
          <h4 className='text-center text-white'>Loading...</h4>
        ) : (
          <>
            {/* <div
              className='h1 font-weight-bold d-flex align-items-center justify-content-center '
              style={{
                height: '100px',
                backgroundColor:
                  'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
                color: 'white',
              }}
            > */}
            <h2 className='text-center' style={{ color: 'white' }}>
              Categories
            </h2>
            {/* </div> */}
            {showCategories()}
          </>
        )}
      </div>
    </Container>
  )
}

export default CategoryList
