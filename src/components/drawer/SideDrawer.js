import React from 'react'
import { Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Noimage from '../../images/Noimage.png'
import { Button } from 'react-bootstrap'

const SideDrawer = () => {
  const dispatch = useDispatch()
  const { drawer, cart } = useSelector((state) => ({ ...state }))

  const imageStyle = {
    width: '100%',
    height: '50px',
    objectFit: 'cover',
  }
  return (
    <Drawer
      className='text-center'
      title={`Total ${cart.length} Products`}
      //   placement='left'
      //   closable={false}
      onClose={() => {
        dispatch({
          type: 'SET_VISIBLE',
          payload: false,
        })
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className='row'>
          <div className='col'>
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} />
                <p className='text-center bg-secondary text-dark'>
                  {p.title} x {p.count}
                </p>
                <hr />
                <br />
              </>
            ) : (
              <>
                <img src={Noimage} style={imageStyle} />
                <p className='text-center bg-secondary text-dark'>
                  {p.title} x {p.count}
                </p>
                <hr />

                <br />
              </>
            )}
          </div>
        </div>
      ))}
      <Link to='/cart'>
        <Button
          onClick={() =>
            dispatch({
              type: 'SET_VISIBLE',
              payload: false,
            })
          }
          className='btn btn-primary w-100'
        >
          Go To Cart
        </Button>
      </Link>
    </Drawer>
  )
}

export default SideDrawer
