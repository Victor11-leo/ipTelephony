'use client'

import React,{useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import * as api from '@/lib/extensionsApi'
import {ArrowLeftCircleIcon} from '@heroicons/react/24/solid'

const AddAdmin = ({close}) => {
    const [form,setForm] = useState({
        fname:'',
        sname:'',
        email:'',
        adminType:''
    })

    const mutation = useMutation((data) => {
        return api.createAdmins(data)
    })

    const roles = ['Super','Limited']

    const inputs = [
        {
            id:1,
            name:'fname',
            type:'text',
            placeholder:"First Name",
            label:'fname'
        },
        {
            id:2,
            name:'sname',
            type:'text',
            placeholder:"Surname",
            label:'sname'
        },
        {
            id:3,
            name:'email',
            type:'email',
            placeholder:"Email",
            label:'email'
        },
        
    ]
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.table(form)
        // validate()
        const sendData = {
            fname:form.fname,
            surname:form.sname,
            email:form.email,
            adminType:form.adminType
        }
        
        mutation.mutate(sendData)
    }
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='bg-white text-slate-900 px-4 py-5 mt-10 font-semibold border-[.4em] border-t-green-900 rounded-sm shadow-md shadow-white'>
            <ArrowLeftCircleIcon 
            onClick={close}
            className='w-5 hover:text-green-900 cursor-pointer'/>
            <form onSubmit={handleSubmit}>
                
                {inputs.map((input) => (
                    <div 
                    key={input.id}
                    className='grid gap-1 my-2'
                    >
                        <label htmlFor="">{input.placeholder}</label>
                        <input 
                        name={input.name}
                        placeholder={input.placeholder}
                        type={input.type} 
                        onChange={handleChange}
                        value={form[input.name]}
                        className='bg-slate-900 text-white w-[400px] px-2 py-1'
                        />
                        {/* {error &&  <p>{error}</p>} */}
                        
                    </div>
                ))}
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

export default AddAdmin