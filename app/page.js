'use client'

import React,{Fragment} from 'react'
import { TableNormal } from '@/components'

const page = () => {
  localStorage.removeItem('user')
  return (
    <Fragment>

      <div className='bg-slate-200 h-screen relative flex flex-col'>
        {/* Header */}
        <header className='bg-green-800 w-full flex items-end space-x-4 px-10 py-1 shadow-sm shadow-black'>
          <div>
            <img 
            className='w-[40px]'
            src="/jkuatLogo2.png" alt="logo" />
          </div>
          <div>
            <h2 className='text-white font-semibold'>IP Telephony</h2>
          </div>
        </header>
        {/* Body */}
        <div className='h-full w-full bg-slate-900 flex justify-center pt-8'>
          <TableNormal/>
        </div>
        {/* Footer */}
        <footer className='bg-green-800 w-full flex justify-center absolute bottom-0 py-1'>
          <h2 className='text-white font-medium'>All Copyrights Reserved</h2>
        </footer>
      </div>
    </Fragment>
  )
}

export default page