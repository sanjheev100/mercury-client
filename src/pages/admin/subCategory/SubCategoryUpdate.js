import React, { useState, useEffect } from 'react'
import {
  AdminNav,
  CategoryCreateForm,
  FormContainer,
} from '../../../components'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCategories } from '../../../api/category'
import { useParams, useNavigate } from 'react-router-dom'
import { getSubCategory, updateSubCategory } from '../../../api/subCategory'

const SubCategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }))

  const [name, setName] = useState('')
  const [buttonloading, setButtonLoading] = useState(false)
  //   const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [parent, setParent] = useState('')

  //parent category

  let { slug } = useParams()

  const navigate = useNavigate()

  //search while filter
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadAllCategories()
    loadSubCategory()
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
  const loadSubCategory = () => {
    getSubCategory(slug)
      .then((res) => {
        setName(res.data.subCategory.name)
        setParent(res.data.subCategory.parent)
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

    if (!parent) {
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
    updateSubCategory(slug, { name, parent }, user.token)
      .then((res) => {
        setButtonLoading(false)

        toast.success(`${res.data.name} is created`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        navigate(-1)
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

  return (
    <>
      {loading ? (
        <h4 className='text-white text-center '>Loading...</h4>
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
                  title={'Update Sub Category'}
                />

                <div className='form-group mb-2'>
                  <label>
                    <strong className='text-white'>Select Category</strong>
                  </label>
                  <select
                    required={true}
                    name='category'
                    className='form-control'
                    onChange={(e) => setParent(e.target.value)}
                    value={parent._id}
                  >
                    {categories &&
                      categories.length > 0 &&
                      categories?.map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                          selected={c._id === parent}
                        >
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </FormContainer>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SubCategoryUpdate
