'use client'
import React,{useState} from 'react'
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const Dashboard = () => {
  
  const url = 'http://localhost:4040/api/extensions'
  const url2 = 'http://localhost:4040/api/admins'

  // const admins = useQuery({
  //   queryKey:'admins',
  //   queryFn: async () => {
  //       // await wait(2000)
  //       const {data} = await axios.get(url2)
  //       return data.extensions
  //   }
  // })
  const extensions = useQuery({
    queryKey:'extensions',
    queryFn: async () => {
        // await wait(2000)
        const {data} = await axios.get(url)
        return data.extensions
    }
  })

  

  if(extensions.isLoading) return (<div><h2>Fetching data</h2></div>)
  const allExtensions = extensions.data.extensions
  const totalExtensions = allExtensions.length
  const campuses2 = new Set (allExtensions.map((d) => d.cname))
  const campuses =  Array.from(campuses2)
  const allCampuses = campuses.length

  // if(admins.isLoading) return (<div><h2>Fetching data</h2></div>)
  // const allAdmins = admins.data
  // console.log(admins.data)
  // // const totalAdmins = allAdmins.length
  // // const superAdmins = allAdmins.filter((f) => f.adminType.toLowerCase() == 'superadmin').map((d) => d)
  // // const totalSuperAdmins = superAdmins.length
  // // const totalLimitedAdmins = totalAdmins - totalSuperAdmins

  
  return (
    <div className='w-[800px] font-semibold pt-40 grid gap-6'>
         <div className='w-[800px] bg-green-800 text-white grid gap-4 px-4 py-2 rounded-sm ring-2 ring-gray-800/75 shadow-md shadow-gray-900'>
          <h2 className='text-sm underline'>Extension Overview</h2>
          <div className='flex items-end justify-between w-[400px]'>
            <h2>Campuses</h2>
            <h3 className='text-4xl'>{allCampuses}</h3>
          </div>
          <div className='flex items-end justify-between w-[400px]'>
            <h2>Extensions</h2>
            <h3 className='text-4xl'>{totalExtensions}</h3>
          </div>
         </div>

         {/* <div className='w-[800px] bg-green-800 text-white grid gap-4 px-4 py-2 rounded-sm ring-2 ring-gray-800/75 shadow-md shadow-gray-900'>
            <h2 className='text-sm underline'>Admins Overview</h2>
            <div className='flex items-end justify-between w-[400px]'>
              <h2>Admins</h2>
              <h3 className='text-4xl'>{totalAdmins}</h3>
            </div>
            <div className='flex items-end justify-between w-[400px]'>
              <h2>Super-admins</h2>
              <h3 className='text-4xl'>{totalSuperAdmins}</h3>
            </div>
            <div className='flex items-end justify-between w-[400px]'>
              <h2>Limited-admins</h2>
              <h3 className='text-4xl'>{totalLimitedAdmins}</h3>
            </div>
         </div> */}
    </div>
  )
}

export default Dashboard