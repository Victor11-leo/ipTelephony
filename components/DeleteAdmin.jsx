'use client'

import React,{useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import * as api from '@/lib/extensionsApi'
import {ArrowLeftCircleIcon} from '@heroicons/react/24/solid'

const DeleteAdmin = ({data2,id,close}) => {
    

    const selected = data2.filter((f) => f.id == id).map((d) => d)
    const mutation = useMutation((data) => {
        return api.deleteAdmins()
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // validate()
        const sendData = {
            id:id
        }
        
        mutation.mutate(sendData)
    }
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='bg-white text-slate-900 px-4 py-5 mt-10 font-semibold border-[.4em] border-t-red-900 rounded-sm shadow-md shadow-red-400'>
            <ArrowLeftCircleIcon 
            onClick={close}
            className='w-5 hover:text-green-900 cursor-pointer'/>
            <form onSubmit={handleSubmit}>
                <p className='text-lg'>Are you sure you want to <span className='underline'>delete</span> </p>
                <p className='text-md'>{selected[0].email}/{id}</p>

                <button 
                className='bg-red-900 border-4 text-white mx-auto w-[200px] py-2 rounded-sm hover:outline-4 hover:bg-transparent hover:text-red-900 border-red-900 mt-5'
                type='submit'> Delete</button>
            </form>
        </div>
    </div>
  )
}

export default DeleteAdmin