import React from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const AddressForm = ({
  handleCategoryChange,
  values,
  handleChange,
  submitHandler,
  subOptions,
  showSub,
  setValues,
  field,
  setField,
}) => {
  const { flatNumber, name, street, pincode, landmark, city, number } = values

  const { user } = useSelector((state) => ({ ...state }))
  return (
    <div>
      <Form>
        <Form.Group controlId='name'>
          <Form.Label style={{ color: 'black' }}>Name</Form.Label>
          <Form.Control
            type='text'
            autoFocus={true}
            required={true}
            placeholder='Name'
            value={name}
            name='name'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />

        <Form.Group controlId='flatNumber'>
          <Form.Label style={{ color: 'black' }}>flatNumber</Form.Label>
          <Form.Control
            type='text'
            name='flatNumber'
            required={true}
            placeholder='flatNumber'
            value={flatNumber}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='street'>
          <Form.Label style={{ color: 'black' }}>street</Form.Label>
          <Form.Control
            type='text'
            name='street'
            required={true}
            placeholder='street'
            value={street}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='city'>
          <Form.Label style={{ color: 'black' }}>City</Form.Label>
          <Form.Control
            name='city'
            type='text'
            required={true}
            placeholder='city '
            value={city}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='brand'>
          <Form.Label style={{ color: 'black' }}>Landmark</Form.Label>
          <Form.Control
            name='landmark'
            type='text'
            required={true}
            placeholder='near bus stop'
            value={landmark}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='Phone'>
          <Form.Label style={{ color: 'black' }}>Phone</Form.Label>
          <Form.Control
            name='number'
            type='number'
            required={true}
            placeholder='1234567890'
            value={number}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='pincode'>
          <Form.Label style={{ color: 'black' }}>pincode</Form.Label>
          <Form.Control
            name='pincode'
            disabled={true}
            type='number'
            required={true}
            placeholder='453441'
            value={pincode}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
      </Form>
    </div>
  )
}

export default AddressForm
