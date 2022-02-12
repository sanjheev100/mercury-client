import React from 'react'
import animationData from './loading.json'
import Lottie from 'react-lottie'

const SimpleLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div
      style={{
        width: '2000px',
        height: '100px',
        left: '50%',
        top: '50%',
        position: 'absolute',
        marginLeft: '-50px',
        marginRight: '-50px',
      }}
    >
      <Lottie
        width={70}
        options={defaultOptions}
        style={{
          marginBottom: 15,
          marginLeft: 0,
          backgroundColor: '#fafafa',
        }}
      />
    </div>
  )
}

export default SimpleLoader
