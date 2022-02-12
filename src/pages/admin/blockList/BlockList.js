import React, { useState, useEffect } from 'react'
import {
  AdminNav,
  CategoryCreateForm,
  FormContainer,
  LocalSearch,
} from '../../../components'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Tooltip } from 'antd'
import { changeBlock, getAllUsers } from '../../../api/user'

const BlockList = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  //search while filter
  const [keyword, setKeyword] = useState('')

  const loadAlluser = () => {
    getAllUsers(user.token)
      .then((res) => {
        setUsers(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  useEffect(() => {
    if (user !== null) {
      loadAlluser()
    }
  }, [])

  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  const handleBlock = (id, isBlocked) => {
    changeBlock(id, isBlocked, user.token)
      .then((res) => {
        toast.success('Action Done')
        loadAlluser()
      })
      .catch((err) => {
        console.log(err)
        toast.error('error')
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
              <FormContainer>
                <LocalSearch
                  keyword={keyword}
                  handleSearchChange={handleSearchChange}
                />

                {users.filter(searched(keyword)).map((c) => (
                  <div key={c._id} className='alert alert-success'>
                    {c.email} is{' '}
                    <b>{c.isBlocked === true ? 'Blocked' : 'Not Blocked'}</b>
                    <span className='float-end mx-2'>
                      {c.isBlocked === false ? (
                        <Tooltip title='Block'>
                          <i
                            className='far fa-times-circle text-danger'
                            onClick={() => handleBlock(c._id, c.isBlocked)}
                          ></i>
                        </Tooltip>
                      ) : (
                        <Tooltip title='Unblock'>
                          <i
                            className='far fa-check-circle text-danger'
                            onClick={() => handleBlock(c._id, c.isBlocked)}
                          ></i>
                        </Tooltip>
                      )}
                    </span>
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

export default BlockList
