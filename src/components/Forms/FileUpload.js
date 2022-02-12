import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const FileUpload = ({ values, setValues, setImageLoader }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const fileUploadAndResize = (e) => {
    let files = e.target.files

    let allUploadedFiles = values.images

    if (files) {
      setImageLoader(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          e.target.files[0],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            // console.log(uri)
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                console.log(res.data)
                setImageLoader(false)
                allUploadedFiles.push(res.data)
                setValues({ ...values, images: allUploadedFiles })
              })
              .catch((err) => {
                toast.error('IMAGE_UPLOAD_FAILED')
                setImageLoader(false)
              })
          },
          'base64'
        )
      }
    }
  }

  return (
    <>
      <Row>
        <div className='form-group'>
          <label style={{ color: 'white' }} className='form-label mt-4'>
            File Upload (select one by one)
          </label>
          <input
            className='form-control'
            type='file'
            multiple={true}
            accept='image/*'
            id='formFile'
            onChange={fileUploadAndResize}
          />
        </div>
      </Row>
    </>
  )
}

export default FileUpload

//  {
//    values.images &&
//      values.images.map((image) => (
//        <Row>
//          <div>
//
//          </div>
//        </Row>
//      ))
//  }
