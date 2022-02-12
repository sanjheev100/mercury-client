import React from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
const CategoryCreateForm = ({
  submitHandler,
  name,
  setName,
  buttonloading,
  title,
}) => {
  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>
            <strong style={{ color: 'white' }}>{title}</strong>
          </Form.Label>
          <Form.Control
            type='text'
            autoFocus={true}
            required={true}
            placeholder={`${title} name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          <Form.Text className='text-muted'>minimum 2 characters</Form.Text>
        </Form.Group>

        {buttonloading ? (
          <Button variant='primary' className='btn-sm btn-danger mt-3' disabled>
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
            disabled={buttonloading || !name || name.length < 2}
            className='btn-raised mt-3'
            variant='primary'
          >
            Create
          </Button>
        )}
      </Form>
      <br />
    </>
  )
}

export default CategoryCreateForm
