import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Form, Col } from 'react-bootstrap'
import { FormContainer, SimpleLoader } from '../../components'
import { authen, googleAuthProvider } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { confettishow } from '../../common/confetti'
import { createOrUpdateUser } from '../../api/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (user && user.token) {
  //     navigate('/')
  //   }
  // }, [user, navigate])

  const roleBasedRedirect = (res) => {
    if (res.data.role !== 'admin') {
      navigate('/user/history')
    } else {
      navigate('/admin/dashboard')
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await authen.signInWithEmailAndPassword(email, password)
      // console.log(result)
      const { user } = result
      const idTokenResult = await user.getIdTokenResult()
      setLoading(true)

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          })
          setEmail('')
          setPassword('')
          roleBasedRedirect(res)
        })
        .catch((error) => {
          toast.error(error, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        })

      toast.success('Logged In SuccessFully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      setLoading(false)
      confettishow()
    } catch (error) {
      // console.log(error)
      setLoading(false)
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const googleLogin = async () => {
    setLoading(true)
    authen
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result
        const idTokenResult = await user.getIdTokenResult()
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            })
            roleBasedRedirect(res)
            confettishow()
          })
          .catch((error) => {
            console.log(error)
          })
        // navigate('/')
        toast.success('Success', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.message)
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  return (
    <FormContainer>
      {loading ? (
        <SimpleLoader /> //loader component
      ) : (
        <>
          {user && user.token ? (
            <h4>Already Logged IN</h4>
          ) : (
            <>
              <h1>Sign In</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                  <Form.Label>
                    <strong style={{ color: 'black' }}>Email Address</strong>
                  </Form.Label>
                  <Form.Control
                    type='email'
                    autoFocus={true}
                    placeholder='Enter your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <br />
                <Form.Group controlId='password'>
                  <Form.Label>
                    <strong style={{ color: 'black' }}>Password</strong>
                  </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter your Password'
                    value={password}
                    autoComplete='on'
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button
                  onClick={(e) => submitHandler(e)}
                  type='submit'
                  className='mt-3 btn btn-primary'
                  disabled={
                    !email || password.length < 8 || (user && user.token)
                  }
                >
                  <i className='fa fa-sign-in' aria-hidden='true'></i> Login
                  With Mail/Password &nbsp;
                </Button>

                <br />
                <Button
                  onClick={() => googleLogin()}
                  type='button'
                  className='mt-2 btn btn-danger'
                  disabled={user && user.token}
                >
                  <i className='fa fa-sign-in' aria-hidden='true'></i>
                  {'  '} Login With Google Account
                </Button>
              </Form>
              <Row className='py-3'>
                <Col style={{ color: 'black' }}>
                  Can't Login? <Link to='/register'>Register Now</Link>
                  &nbsp;or{' '}
                  <Link to='/forgot/password' className='text-danger'>
                    Forgot Password
                  </Link>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </FormContainer>
  )
}

export default Login
