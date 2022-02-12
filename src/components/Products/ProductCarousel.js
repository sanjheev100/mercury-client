import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

const ProductCarousel = ({ newlyAddedproducts }) => {
  return (
    <Carousel className='carousel-custom' pause='hover'>
      {newlyAddedproducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product.slug}`}>
            <Image
              className='Home-carousel-produt'
              src={
                product.images && product.images.length
                  ? product.images[0].url
                  : `https://res.cloudinary.com/duigjlhf8/image/upload/v1642846803/No_image_kztd4b.png`
              }
            />

            <br />
            <Carousel.Caption className='carousel-caption '>
              <h2>{product.title}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
export default ProductCarousel
