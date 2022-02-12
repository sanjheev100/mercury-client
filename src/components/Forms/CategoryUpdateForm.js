import React from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'

const CategoryUpdateForm = ({
  name,
  setName,
  submitHandler,
  buttonloading,
}) => {
  return (
    <div>
      {' '}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>
            <strong>Update Category</strong>
          </Form.Label>
          <Form.Control
            type='text'
            autoFocus={true}
            required={true}
            placeholder='Category Name'
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
            Update
          </Button>
        )}
      </Form>
      <br />
    </div>
  )
}

export default CategoryUpdateForm
