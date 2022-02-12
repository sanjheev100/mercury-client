import React from 'react'
import { Form } from 'react-bootstrap'

const LocalSearch = ({ keyword, handleSearchChange }) => {
  return (
    <div>
      <Form>
        <Form.Group controlId='keyword'>
          <Form.Label>
            <strong style={{ color: 'white' }}>search</strong>
          </Form.Label>
          <Form.Control
            type='search'
            required={true}
            placeholder='Filter'
            value={keyword}
            onChange={handleSearchChange}
          ></Form.Control>
        </Form.Group>
      </Form>
      <br />
    </div>
  )
}

export default LocalSearch
