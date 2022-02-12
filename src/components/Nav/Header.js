import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap'
import styles from '../../styles/Header.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import firebase from 'firebase/compat/app'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Search from '../Forms/Search'
import { Badge } from 'antd'
const Header = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let { user, cart } = useSelector((state) => ({ ...state }))

  const logoutHandler = () => {
    firebase.auth().signOut()
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    })
    toast('Logged Out SuccessFully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    navigate('/')
  }

  const dashboardRedirect = () => {
    if (user && user.role === 'admin') {
      navigate('/admin/dashboard')
    } else {
      navigate('/user/history')
    }
  }

  const contactusHandler = () => {
    navigate('/contactus')
  }
  return (
    <header>
      <Navbar
        className={styles.Header}
        varaint='dark'
        expand='lg'
        style={{ minHeight: 70 }}
        collapseOnSelect
      >
        <Container>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <div className={styles.title}>
              <Image src='/images/logo.png' alt='logo' />
            </div>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto py-sm-2' id='navItems'>
              <div
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  marginRight: '10px',
                  marginLeft: '10px',
                }}
              >
                <Search />
              </div>
              <div>
                <Link
                  to='/cart'
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    marginRight: '30px',
                    // marginLeft: 'px',
                  }}
                >
                  <Badge count={cart.length} offset={[9, 0]}>
                    <i
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                      }}
                      className='fas fa-cart-plus'
                    ></i>{' '}
                    <span
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                      }}
                    >
                      Cart
                    </span>
                  </Badge>
                </Link>
              </div>

              {/* </> */}

              <Link
                to='/shop'
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  marginRight: '10px',
                  // marginLeft: '10px',
                }}
              >
                <i className='fa fa-shop'></i> Shop
              </Link>

              {!user && (
                <Link
                  to='/login'
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <i className='fa fa-sign-in' aria-hidden='true'></i> Sign In
                </Link>
              )}
              {user && (
                <NavDropdown
                  style={{ bottom: 8 }}
                  title={
                    <span className='my-auto' style={{ color: 'white' }}>
                      {user.email && user.email.split('@')[0]}
                    </span>
                  }
                  id='username'
                >
                  <NavDropdown.Item onClick={() => dashboardRedirect()}>
                    <i className='fa fa-server' aria-hidden='true'></i>{' '}
                    DashBoard
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={() => contactusHandler()}>
                    <i className='far fa-paper-plane' aria-hidden='true'></i>{' '}
                    Contact Us
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={() => logoutHandler()}>
                    <i className='fa fa-sign-out' aria-hidden='true'></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
