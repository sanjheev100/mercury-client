import React, { useState } from 'react'
import { Button, Col, Form, FormControl } from 'react-bootstrap'

const ProductCreateForm = ({
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
  const {
    title,
    description,
    price,
    categories,
    category,
    subCategory,
    quantity,
    images,
    brand,
  } = values
  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='title'>
          <Form.Label style={{ color: 'white' }}>Product Name</Form.Label>
          <Form.Control
            type='text'
            autoFocus={true}
            required={true}
            placeholder='Product Name'
            value={title}
            name='title'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='description'>
          <Form.Label style={{ color: 'white' }}>
            Product Description
          </Form.Label>
          <Form.Control
            type='text'
            name='description'
            required={true}
            placeholder='Product description'
            value={description}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='price'>
          <Form.Label style={{ color: 'white' }}>Product Price</Form.Label>
          <Form.Control
            type='number'
            name='price'
            required={true}
            placeholder='Product Price'
            value={price}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />

        <Form.Group controlId='quantity'>
          <Form.Label style={{ color: 'white' }}>Product Quantity</Form.Label>
          <Form.Control
            name='quantity'
            type='number'
            required={true}
            placeholder='Product Quantity'
            value={quantity}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />

        <Form.Group controlId='brand'>
          <Form.Label style={{ color: 'white' }}>Product Brand</Form.Label>
          <Form.Control
            name='brand'
            type='text'
            required={true}
            placeholder='Product Brand'
            value={brand}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <div className='form-group mb-2'>
          <label className='mb-2'>
            <strong style={{ color: 'white' }}>Category</strong>
          </label>
          <select
            required={true}
            name='category'
            className='form-control'
            onChange={handleCategoryChange}
          >
            <option>Please Select</option>
            {categories &&
              categories.length > 0 &&
              categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <br />
          <Form.Label style={{ color: 'white' }}>
            selected Subcategories count
          </Form.Label>
          <FormControl disabled type='text' placeholder={field.length} />

          {showSub && (
            <Form.Group as={Col} controlId='my_multiselect_field'>
              <Form.Label style={{ color: 'white' }}>My multiselect</Form.Label>
              <Form.Control
                as='select'
                multiple
                value={field}
                onChange={(e) =>
                  setField(
                    [].slice
                      .call(e.target.selectedOptions)
                      .map((item) => item.value)
                  )
                }
              >
                {subOptions.length &&
                  subOptions.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
              </Form.Control>
              <Form.Text style={{ color: 'white' }}>
                ( Use Ctrl+click to select many)
              </Form.Text>
            </Form.Group>
          )}
        </div>

        <Button
          type='submit'
          className='mt-2 btn btn-success'
          //   disabled={user && user.token}
        >
          Create Product &nbsp;
          <i className='fa fa-check' aria-hidden='true'></i>
        </Button>
      </Form>
    </div>
  )
}

export default ProductCreateForm
