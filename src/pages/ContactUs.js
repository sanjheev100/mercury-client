import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FormContainer } from '../components'
import { Form, Button, Spinner } from 'react-bootstrap'
import { createContact } from '../api/contactus'
import { useNavigate } from 'react-router-dom'

const ContactUs = () => {
  const [buttonloading, setButtonLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()

  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

  const submitHandler = (e) => {
    e.preventDefault()
    let payload = {
      name,
      email,
      phone,
      content,
    }
    if (!name || !email || !phone || !content) {
      return toast.error('All are required Fields')
    }

    if (!phoneRegex.test(phone)) {
      return toast.error('Enter a Valid Phone Number wihtout country code')
    }

    setButtonLoading(true)
    createContact(payload)
      .then((res) => {
        toast.success(
          'Your request has been received, we will contact you shortly'
        )
        setButtonLoading(false)

        setName('')
        setEmail('')
        setPhone('')
        setContent('')
        navigate('/')
      })
      .catch((err) => {
        toast.error(err)
        setButtonLoading(false)
      })
  }
  return (
    <>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>
              <strong style={{ color: 'white' }}>Name</strong>
            </Form.Label>
            <Form.Control
              type='text'
              autoFocus={true}
              required={true}
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId='email'>
            <Form.Label>
              <strong style={{ color: 'white' }}>Email</strong>
            </Form.Label>
            <Form.Control
              type='text'
              autoFocus={true}
              required={true}
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId='phone'>
            <Form.Label>
              <strong style={{ color: 'white' }}>Phone</strong>
            </Form.Label>
            <Form.Control
              type='Number'
              autoFocus={true}
              required={true}
              placeholder='Phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId='content'>
            <Form.Label>
              <strong style={{ color: 'white' }}>Content</strong>
            </Form.Label>
            <Form.Control
              as='textarea'
              required={true}
              placeholder='Type Your Query'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
          </Form.Group>

          {buttonloading ? (
            <Button
              variant='primary'
              className='btn-sm btn-danger mt-3'
              disabled
            >
              <Spinner
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              {'  '}
              Loading...
            </Button>
          ) : (
            <Button
              type='submit'
              disabled={buttonloading || !name || !content || !email}
              className='btn-raised mt-3'
              variant='primary'
            >
              Create
            </Button>
          )}
        </Form>
      </FormContainer>
    </>
  )
}

export default ContactUs
