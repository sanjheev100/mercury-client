import React, { useState, useEffect } from 'react'
import { getContactForms, deleteContactForm } from '../../api/contactus'
import { useSelector } from 'react-redux'
import { AdminNav } from '../../components'
import { Tooltip } from 'antd'
import { toast } from 'react-toastify'

const AdminContactus = () => {
  const [contacts, setContacts] = useState([])

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    if (user !== null) {
      loadAllContact()
    }
  }, [])

  const loadAllContact = () => {
    getContactForms(user.token).then((res) => {
      setContacts(res.data)
    })
  }

  const handleDelete = (id) => {
    let answer = window.confirm('are you sure wanna delete?')
    if (answer) {
      deleteContactForm(id, user.token)
        .then((res) => {
          toast.success('SuccessFully Removed')
          loadAllContact()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const showContactTable = (contact) => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Content</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((c, i) => (
          <tr key={i}>
            <td>{c.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  const showEachRequest = () =>
    contacts.map((contact, i) => (
      <div key={i} className='m-5 p-3 card'>
        <>
          <div>
            <p>
              <span>
                <b>Form Id </b>: {contact._id}
              </span>{' '}
              {' / '}{' '}
              <span>
                <b>Submitted By</b> : {contact.name}
              </span>
              {' / '}
              <span>
                <b>Phone</b> : {contact.phone}
              </span>
              {' / '}
              <span>
                <Tooltip title={'delete'} placement='bottom'>
                  <span
                    className='pointer'
                    onClick={() => handleDelete(contact._id)}
                  >
                    <i className='far fa-trash-alt '></i> Delete
                  </span>
                </Tooltip>
              </span>
            </p>
          </div>
        </>
        {showContactTable(contact)}
      </div>
    ))

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <h4 className='text-center mytext-white'>
            {contacts.length ? 'Contact Request' : 'No Request yet'}
          </h4>
          {showEachRequest()}
        </div>
      </div>
    </div>
  )
}

export default AdminContactus
