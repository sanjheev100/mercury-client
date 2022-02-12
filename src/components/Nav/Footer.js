import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col className='text-center py-3' style={{ color: 'white' }}>
            <Link to='/contactus' style={{ textDecoration: 'none' }}>
              <h5 style={{ color: '#1881f0' }}>Contact Us</h5>
            </Link>
            <h4 className='text-white'>Copyright &copy; Mercury </h4>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer
