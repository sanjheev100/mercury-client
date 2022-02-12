import React from 'react'
// import { IoStarOutline, IoStarHalfSharp, IoStarSharp } from 'react-icons/io5'
const Ratings = ({ value, text }) => {
  return (
    <div className='rating'>
      <span>{text && text}</span>
    </div>
  )
}

export default Ratings
