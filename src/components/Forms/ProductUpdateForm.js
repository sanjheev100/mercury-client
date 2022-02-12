import React, { useState } from 'react'
import { Button, Col, Form, FormControl } from 'react-bootstrap'

const ProductUpdateForm = ({
  handleCategoryChange,
  values,
  handleChange,
  handleSubmit,
  subOptions,
  showSub,
  setValues,
  field,
  setField,
  categories,
  arrayofSubIds,
  setArrayofSubIds,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    subCategory,
    quantity,
    images,
    brand,
  } = values

  var subOptionsCopy = subOptions

  const currentSubs = []

  for (let i = 0; i <= arrayofSubIds.length; i++) {
    subOptionsCopy.map((sub) => {
      if (sub._id == arrayofSubIds[i]) {
        currentSubs.push(sub.name)
      }
    })
  }

  if (showSub || currentSubs) {
    var checker = true
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
            value={selectedCategory ? selectedCategory._id : category._id}
          >
            {categories &&
              categories.length > 0 &&
              categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <br />

          {field.length < 1 && (
            <>
              <Form.Label style={{ color: 'white' }}>
                Previously Selected Categories
              </Form.Label>
              <FormControl
                disabled
                type='text'
                placeholder={field.length < 1 ? currentSubs : field}
              />
            </>
          )}

          {checker && (
            <Form.Group as={Col} controlId='my_multiselect_field'>
              <Form.Label style={{ color: 'white' }}>
                Select Sub Categories
              </Form.Label>
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
          Update Product &nbsp;
          <i className='fa fa-check' aria-hidden='true'></i>
        </Button>
      </Form>
    </div>
  )
}

export default ProductUpdateForm
