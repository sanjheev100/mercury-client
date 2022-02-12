import React, { useState, useEffect } from 'react'
import {
  AdminNav,
  FormContainer,
  CategoryUpdateForm,
} from '../../../components'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCategory, updateCategory } from '../../../api/category'
import { useNavigate, useParams } from 'react-router-dom'
const CategoryUpdate = () => {
  let { slug } = useParams()
  const { user } = useSelector((state) => ({ ...state }))

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [buttonloading, setButtonLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory = () => {
    setLoading(true)
    getCategory(slug).then((res) => {
      setLoading(false)
      setName(res.data.name)
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
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setButtonLoading(false)
        setName('')
        toast.success(`${res.data.name} is Updated`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        navigate(-1)
        // loadAllCategories()
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
              {' '}
              <FormContainer>
                <CategoryUpdateForm
                  name={name}
                  setName={setName}
                  submitHandler={submitHandler}
                  buttonloading={buttonloading}
                />
              </FormContainer>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CategoryUpdate
