'use client'
import React,{useState} from 'react'
import { useQuery } from "@tanstack/react-query"
import {ChevronLeftIcon,ChevronRightIcon,ChevronDoubleLeftIcon,ChevronDoubleRightIcon,MagnifyingGlassIcon, PlusIcon, PencilSquareIcon,TrashIcon} from '@heroicons/react/24/solid'
import axios from "axios"
import { filterExtension } from '@/lib'
import { AddExtension,DeleteExtension,UpdateExtension } from '.'


const Extensions = () => {
  const url = 'http://localhost:4040/api/extensions'
  const {data,isLoading} = useQuery({
    queryKey:'extensions',
    queryFn: async () => {
        // await wait(2000)
        const {data} = await axios.get(url)
        return data
    }
  })

  const [page,setPage] = useState(1)
  const [start,setStart] = useState(0)
  const [search,setSearch] = useState('')
  const [view,setView] = useState('')
  const [chosen,setChosen] = useState('')

  if(isLoading) return (<div><h2>Fetching data</h2></div>)

  const filteredData = data && filterExtension(data.extensions,search) 
  const totalPages = Math.floor(filteredData.length / 10)

  const forward = () => {
    if (page > totalPages - 1) return
    setPage((prev) => prev + 1)
    setStart((prev) => prev + 10)
  }
  const forward2 = () => {
    if (page > totalPages - 10) return
    setPage((prev) => prev + 10)
    setStart((prev) => prev + 100)
  }
  const back = () => {
    if (page < 2) return
    setPage((prev) => prev - 1)
    setStart((prev) => prev - 10)
  }
  const back2 = () => {
    if (page < 20) return
    setPage((prev) => prev - 10)
    setStart((prev) => prev - 100)
  }


  const onClose = () => {setView('')}
  


  
  return (
    <div className='relative flex flex-col'>
      {view == '' && (
        <>
          {/* Search and filters */}
          <div className='flex items-center justify-between w-[490px] relative mb-10'>
            <MagnifyingGlassIcon className='w-5 text-slate-900 absolute'/>
            <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='bg-white rounded-sm flex w-[400px] pl-8 py-1 font-semibold border-none outline-none text-slate-800 placeholder:text-sm '
            placeholder='Search by Extension,Campus,,Department,Owner....'
            type="text" />        
          </div>

          <div 
          onClick={() => setView('add')}
          className='bg-green-800 rounded-full w-8 h-8 flex items-center justify-center my-4 cursor-pointer'>
            <PlusIcon className='text-white w-5'/>
          </div>

          
          {isLoading ? 
          <>
            <h2>Fetching data</h2>
          </>
          :
          <div className='bg-green-800 text-white w-[1000px] min-h-[60vh] px-2 py-1 relative'>
            <div className='grid grid-cols-6 underline font-semibold'>
              <h2>Extensions</h2>
              <h2>Campus</h2>
              <h2>Department</h2>
              <h2>Owner</h2>
              <h2>Edit</h2>
              <h2>Delete</h2>
            </div>
            <div className='py-4 mb-5'>
            {filteredData?.slice(start,start + 10).map((d) => (
              <div key={d.id} className='grid gap-5 mt-3'>
                <div className='grid grid-cols-6'>
                  <h2>{d.deptcode}</h2>
                  <h2>{d.cname}</h2>
                  <h2>{d.deptname}</h2>
                  <h2>{d.ownerassigned}</h2>
                  <PencilSquareIcon 
                  onClick={() => {
                    setView('edit')
                    setChosen(d.deptcode)}}
                  className='w-5 cursor-pointer'/>
                  <TrashIcon 
                  onClick={() => {
                    setView('delete')
                    setChosen(d.deptcode)}}
                  className='w-5 cursor-pointer'/>
                </div>
              </div>
            ))}
            </div>
            
            {/* Pagination */}
            <div className='flex items-center justify-between absolute w-full bottom-2 px-10'>
              <div>
                <p>Page {page} /{totalPages}</p>
              </div>
              <div className='flex items-center space-x-2 text-white'> 
                  <ChevronDoubleLeftIcon 
                  onClick={back2}
                  className='w-6 cursor-pointer active:text-blue-900'/>
                  <ChevronLeftIcon 
                  onClick={back}
                  className='w-6 cursor-pointer active:text-blue-900'/>
                  <ChevronRightIcon 
                  onClick={forward}
                  className='w-6 cursor-pointer active:text-blue-900'/>
                  <ChevronDoubleRightIcon 
                  onClick={forward2}
                  className='w-6 cursor-pointer active:text-blue-900'/>
              </div>
            </div>
          </div>
          }
        </>
      )}

      {view == 'add' && <AddExtension data2 = {filteredData} close={onClose}/>}
      {view == 'delete' && <DeleteExtension data2 = {filteredData} id={chosen} close={onClose}/>}
      {view == 'edit' && <UpdateExtension data2 = {filteredData} id={chosen} close={onClose}/>}


    </div>
  )
}

export default Extensions