'use client'

import React,{useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import * as api from '@/lib/extensionsApi'
import {ArrowLeftCircleIcon} from '@heroicons/react/24/solid'

const UpdateAdmin = ({close,id,data2}) => {
    const [form,setForm] = useState({
        adminType:''
    })

    const mutation = useMutation((data) => {
        return api.updateAdmins(data)
    })

    const roles = ['Super','Limited']
    const admin = data2.filter((f) => f.id == id).map((d) => d)

    // const inputs = [
    //     {
    //         id:1,
    //         name:'fname',
    //         type:'text',
    //         placeholder:"First Name",
    //         label:'fname'
    //     },
    //     {
    //         id:2,
    //         name:'sname',
    //         type:'text',
    //         placeholder:"Surname",
    //         label:'sname'
    //     },
    //     {
    //         id:3,
    //         name:'email',
    //         type:'email',
    //         placeholder:"Email",
    //         label:'email'
    //     },
        
    // ]
    // const handleChange = (e) => {
    //     setForm({...form, [e.target.name]: e.target.value})
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.table(form)
        // validate()
        const sendData = {
            id:id,
            adminType:form.adminType
        }
        
        mutation.mutate(sendData)
    }
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='bg-white text-slate-900 px-4 py-5 mt-10 font-semibold border-[.4em] border-t-blue-900 rounded-sm shadow-md shadow-white'>
            <ArrowLeftCircleIcon 
            onClick={close}
            className='w-5 hover:text-green-900 cursor-pointer'/>
            <h2 className='text-lg my-2'>You are updating  <span className='underline'>{admin[0].email}</span></h2>
            <form onSubmit={handleSubmit}>
                
                <div className='grid gap-2'>
                    <select 
                    className='bg-slate-900 text-white w-[400px] px-2 py-1'
                    onChange = {(e) => setForm({...form, adminType: e.target.value})}
                    name="" id="">
                        <option value="">Admin role</option>
                        {roles.map((d,i) => (<option key={i}>{d}</option>))}
                    </select>                    
                </div>

                <button 
                className='bg-green-900 border-4 text-white mx-auto w-[200px] py-2 rounded-sm hover:outline-4 hover:bg-transparent hover:text-green-900 border-green-900 mt-5'
                type='submit'> Submit</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateAdmin