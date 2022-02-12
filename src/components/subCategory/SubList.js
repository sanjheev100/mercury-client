import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { getSubCategories } from '../../api/subCategory'
import { Button, Container } from 'react-bootstrap'

const SubList = () => {
  const [subs, setSubs] = useState([])
  const [subCategoryLoading, setSubCategoryLoading] = useState(false)

  useEffect(() => {
    setSubCategoryLoading(true)
    getSubCategories()
      .then((res) => {
        setSubCategoryLoading(false)
        setSubs(res.data)
      })
      .catch((err) => {
        setSubCategoryLoading(false)
        toast.error(err)
      })
  }, [])

  const showSubs = () =>
    subs.map((s) => (
      <Button
        key={s._id}
        variant='secondary'
        className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'
      >
        <Link to={`/subCategory/${s.slug}`}>{s.name}</Link>
      </Button>
    ))

  return (
    <div className='container'>
      <div className='row'>
        {subCategoryLoading ? (
          <h4 className='text-center text-white'>Loading...</h4>
        ) : (
          <>
            <h2 className='text-center' style={{ color: 'white' }}>
              Sub Categories
            </h2>
            {/* </div> */}
            {showSubs()}
          </>
        )}
      </div>
    </div>
  )
}

export default SubList
