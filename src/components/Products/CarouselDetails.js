import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { toast } from 'react-toastify'

const CarouselDetails = ({ images }) => {
  return (
    <>
      {images && images.length < 1 ? (
        <h1 style={{ color: 'White' }}>No Images Available</h1>
      ) : (
        <Carousel style={{ height: 500 }} pause='hover'>
          {images.map((image) => (
            <Carousel.Item key={image.public_id}>
              <Image
                style={{
                  borderRadius: '10%',
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                }}
                className='d-flex align-items-center'
                // className='carosel-productdetailImg'
                src={image.url}
              />
              <br />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  )
}

export default CarouselDetails
