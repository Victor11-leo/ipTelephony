'use client'

import React,{useState} from 'react'
import {useQueryClient, useMutation,useQuery} from '@tanstack/react-query'
import * as api from '@/lib/extensionsApi'
import {ArrowLeftCircleIcon} from '@heroicons/react/24/solid'


const UpdateExtension = ({data2,id,close}) => {
    const [form,setForm] = useState({
        campus:'',
        department:'',
        owner:'',
        extension:''
    })

    const campuses2 = new Set(data2.map((d) => d.cname))
    const campuses = Array.from(campuses2)

    const depts =  data2.filter((f) => f.cname == form.campus).map((d) => d.deptname)

    // const queryClient = useQueryClient()
    // const extensions = queryClient.getQueryCache().queries
    // console.log(queryClient.getQueryData(['extensions']))
    

    const mutation = useMutation((data) => {
        return api.updateExtensions(data)
    })


    const inputs = [
        {
            id:3,
            name:'owner',
            type:'text',
            placeholder:"Owner",
            errorMessage:'Should be well punctuated',
            label:'owner'
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
            deptcode:id,
            ownerassigned:form.owner,
            deptname:form.department
        }
        
        mutation.mutate(sendData)
    }

    
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='bg-white text-slate-900 px-4 py-5 mt-10 font-semibold border-[.4em] border-t-blue-900 rounded-sm shadow-md shadow-white'>
            <ArrowLeftCircleIcon 
            onClick={close}
            className='w-5 hover:text-green-900 cursor-pointer'/>
            <h2 className='text-lg my-2'>You are updating  <span className='underline'>{id}</span></h2>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-2'>

                    <select 
                    className='bg-slate-900 text-white w-[400px] px-2 py-1'
                    onChange = {(e) => setForm({...form, campus: e.target.value})}
                    name="" id="">
                        <option value="">Campus</option>
                        {campuses.map((d,i) => (<option key={i}>{d}</option>))}
                    </select>
                    <select 
                    className='bg-slate-900 text-white w-[400px] px-2 py-1'
                    onChange = {(e) => setForm({...form, department: e.target.value})}
                    name="" id="">
                        <option value="">Department</option>
                        {depts.map((d,i) => (<option key={i}>{d}</option>))}
                    </select>
                </div>
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

                <button 
                className='bg-green-900 border-4 text-white mx-auto w-[200px] py-2 rounded-sm hover:outline-4 hover:bg-transparent hover:text-green-900 border-green-900 mt-5'
                type='submit'> Submit</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateExtension