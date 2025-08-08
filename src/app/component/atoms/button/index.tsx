import React from 'react'

interface indexProps {
    text?: string;
}

const index = ({text}: indexProps) => {
  return (
    <button className='cursor-pointer bg-amber-400 border-orange-600 transition-transform duration-200 hover:scale-105 hover:bg-blue-700'>
        {text}
    </button>
  )
}

export default index