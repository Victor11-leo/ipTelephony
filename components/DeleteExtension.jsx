'use client'

import React,{useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import * as api from '@/lib/extensionsApi'
import {ArrowLeftCircleIcon} from '@heroicons/react/24/solid'

const DeleteExtension = ({data2,id,close}) => {
    const [form,setForm] = useState({
        campus:'',
        department:'',
        owner:'',
        extension:''
    })

    const selected = data2.filter((f) => f.deptcode == id).map((d) => d)
    const mutation = useMutation((data) => {
        return api.createExtensions(data)
    })


    const inputs = [
        {
            id:1,
            name:'campus',
            type:'text',
            placeholder:"Campus",
            errorMessage:'Should be well punctuated',
            label:'campus'
        },
        {
            id:2,
            name:'department',
            type:'text',
            placeholder:"Department",
            errorMessage:'Should be well punctuated',
            label:'department'
        },
        {
            id:3,
            name:'owner',
            type:'text',
            placeholder:"Owner",
            errorMessage:'Should be well punctuated',
            label:'owner'
        },
        {
            id:4,
            name:'extension',
            type:'text',
            placeholder:"Extension",
            errorMessage:'Should be a 4 digit number',
            label:'extension'
        },
    ]

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const validate  = () => {
        const re = /^\d{4}$/
        const res = re.test(form.extension)
        if (!res) setError(true)
        else setError(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.table(form)
        // validate()
        const sendData = {
            ccode:form.campus,
            deptcode:form.extension,
            ownerassigned:form.owner,
            deptname:form.department
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
                <p className='text-md'>{selected[0].cname}/{selected[0].deptname}/{selected[0].ownerassigned}/{id}</p>

                <button 
                className='bg-red-900 border-4 text-white mx-auto w-[200px] py-2 rounded-sm hover:outline-4 hover:bg-transparent hover:text-red-900 border-red-900 mt-5'
                type='submit'> Delete</button>
            </form>
        </div>
    </div>
  )
}

export default DeleteExtension