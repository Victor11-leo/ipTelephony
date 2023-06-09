'use client'

import React,{useState} from 'react'
import { useQuery } from "@tanstack/react-query"
import {ChevronLeftIcon,ChevronRightIcon,ChevronDoubleLeftIcon,ChevronDoubleRightIcon,MagnifyingGlassIcon, PlusIcon, PencilSquareIcon,TrashIcon} from '@heroicons/react/24/solid'
import axios from "axios"
import { filterAdmin } from '@/lib'
import { AddAdmin,UpdateAdmin,DeleteAdmin } from '.'

const Administrators = () => {
  

  const url = 'http://localhost:4040/api/admins'
  const {data,isLoading} = useQuery({
    queryKey:'admins',
    queryFn: async () => {
        // await wait(2000)
        const {data} = await axios.get(url)
        return data
    }
  })

  const [search,setSearch] = useState('')
  const [view,setView] = useState('')
  const [chosen,setChosen] = useState('')

  const onClose = () => {setView('')}

  if(isLoading) return (<div><h2>Fetching data</h2></div>)
  const filteredData = filterAdmin(data.admins,search)
  return (
    <div className='relative flex flex-col'>
      {view == '' && (
      <>
        <div className='flex items-center justify-between w-[490px] relative mb-10'>
          <MagnifyingGlassIcon className='w-5 text-slate-900 absolute'/>
          <input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-white rounded-sm flex w-[400px] pl-8 py-1 font-semibold border-none outline-none text-slate-800 placeholder:text-sm'
          placeholder='Search by Name,Email'
          type="text" />        
        </div>

        <div 
        onClick={() => setView('add')}
        className='bg-green-800 rounded-full w-8 h-8 flex items-center justify-center my-4 cursor-pointer'>
          <PlusIcon className='text-white w-5'/>
        </div>

        <div className='bg-green-800 text-white w-[1000px] min-h-[60vh] px-2 py-1 relative'>
          <div className='grid grid-cols-4 underline font-semibold'>
            <h2>Name</h2>
            <h2>Role</h2>
            <h2>Edit</h2>
            <h2>Delete</h2>
          </div>
          <div className='py-4 mb-5'>
          {filteredData.map((d) => (
            <div key={d.id} className='grid gap-5 mt-3'>
              <div className='grid grid-cols-4'>
                <h2>{d.fname} {d.surname}</h2>
                <h2>{d.adminType}</h2>
                <PencilSquareIcon 
                onClick={() => {
                  setView('edit')
                  setChosen(d.id)}}
                className='w-5 cursor-pointer'/>
                <TrashIcon 
                onClick={() => {
                  setView('delete')
                  setChosen(d.id)}}
                className='w-5 cursor-pointer'/>
              </div>
            </div>
          ))}
          </div>
          
        
        </div>
      </>
      )}

      {view == 'add' && <AddAdmin  close={onClose}/>}
      {view == 'delete' && <DeleteAdmin data2 = {filteredData} id={chosen} close={onClose}/>}
      {view == 'edit' && <UpdateAdmin data2 = {filteredData} id={chosen} close={onClose}/>}
    </div>
  )
}

export default Administrators