import React from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
const Navbar = ({settoken}) => {
  return (
    <div className='bg-[#ffebf5] border-[#C586A5] flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button onClick={()=>(settoken(''))} className='bg-gray-700 text-white px-2 py-2 sm:px-7 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-gray-600'>Log Out</button>
    </div>
  )
}

export default Navbar
