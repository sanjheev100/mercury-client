import React, { useState, useEffect } from 'react'
import {
  AdminNav,
  CategoryCreateForm,
  FormContainer,
  LocalSearch,
} from '../../../components'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCategories, removeCategory } from '../../../api/category'
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  removeSubCategory,
} from '../../../api/subCategory'

const SubCategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }))

  const [name, setName] = useState('')
  const [buttonloading, setButtonLoading] = useState(false)
  //   const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  //parent category
  const [category, setCategory] = useState('')

  //search while filter
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadAllCategories()
    loadAllSubCategories()
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
  const loadAllSubCategories = () => {
    getSubCategories()
      .then((res) => {
        setSubCategories(res.data)
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

    if (!category) {
      return toast.error(`Select the Category`, {
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
    createSubCategory({ name, parent: category }, user.token)
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
        loadAllSubCategories()
      })
      .catch((err) => {
        setButtonLoading(false)
        toast.error(err, {
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
      removeSubCategory(slug, user.token)
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
          loadAllSubCategories()
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
        <h4 className='text-white text-center'>Loading...</h4>
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
                  title={'Create Sub Category'}
                />

                {name.length > 0 && (
                  <div className='form-group mb-2'>
                    <label>
                      <strong style={{ color: 'white' }}>
                        Select Category
                      </strong>
                    </label>
                    <select
                      required={true}
                      name='category'
                      className='form-control'
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>---------Please Select Parent--------</option>
                      {categories &&
                        categories.length > 0 &&
                        categories?.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <LocalSearch
                  keyword={keyword}
                  handleSearchChange={handleSearchChange}
                />
                {subCategories.filter(searched(keyword)).map((s) => (
                  <div key={s._id} className='alert alert-success'>
                    {s.name}
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
                          onClick={() => handleDelete(s.slug)}
                        ></i>
                      </span>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement='bottom'
                      overlay={<Tooltip id='tooltipment'>Edit</Tooltip>}
                    >
                      <Link
                        to={`/admin/subcategory/${s.slug}`}
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

export default SubCategoryCreate
