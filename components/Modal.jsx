import React from 'react'

const Modal = ({children,setModal}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center flex-col'>
        {children}
    </div>
  )
}

export default Modal