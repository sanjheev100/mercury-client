import React, { useState, useEffect } from 'react'
import {
  AdminNav,
  CategoryCreateForm,
  FormContainer,
  LocalSearch,
} from '../../../components'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../api/category'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }))

  const [name, setName] = useState('')
  const [buttonloading, setButtonLoading] = useState(false)
  //   const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  //search while filter
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadAllCategories()
  }, [])

  const loadAllCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data)
      })
      .catch((err) => {
        toast.error('FETCHING CATEGORY ERROR')
      })
  }
  const submitHandler = (e) => {
    e.preventDefault()

    if (!name || name.length < 2) {
      return toast.error(`Name must be atleast 2 characters`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    setButtonLoading(true)
    createCategory({ name }, user.token)
      .then((res) => {
        setButtonLoading(false)
        setName('')
        toast.success(`${res.data.name} is created`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        loadAllCategories()
      })
      .catch((err) => {
        setButtonLoading(false)
        toast.error(err.response.data, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const handleDelete = async (slug) => {
    if (window.confirm(`are you sure wanna delete ${slug}?`)) {
      setLoading()
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false)
          toast.error(`${res.data.name} is Deleted`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          loadAllCategories()
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err.response.data, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        })
    }
  }

  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  return (
    <>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
              <AdminNav />
            </div>
            <div className='col'>
              <FormContainer>
                <CategoryCreateForm
                  submitHandler={submitHandler}
                  name={name}
                  setName={setName}
                  buttonloading={buttonloading}
                  title={'Create Category'}
                />

                <LocalSearch
                  keyword={keyword}
                  handleSearchChange={handleSearchChange}
                />
                {categories.filter(searched(keyword)).map((c) => (
                  <div key={c._id} className='alert alert-success'>
                    {c.name}
                    <OverlayTrigger
                      placement='bottom'
                      overlay={<Tooltip id='tooltipment'>Delete</Tooltip>}
                    >
                      <span className='float-end mx-2'>
                        <i
                          className='fa fa-trash  text-danger'
                          aria-hidden='true'
                          style={{ cursor: 'pointer' }}
                          //   onClick={() => setShow(true)}
                          onClick={() => handleDelete(c.slug)}
                        ></i>
                      </span>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement='bottom'
                      overlay={<Tooltip id='tooltipment'>Edit</Tooltip>}
                    >
                      <Link
                        to={`/admin/category/${c.slug}`}
                        className='float-end mx-2'
                      >
                        <i
                          className='fa fa-pencil text-primary '
                          aria-hidden='true'
                        ></i>
                      </Link>
                    </OverlayTrigger>
                  </div>
                ))}
              </FormContainer>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CategoryCreate
