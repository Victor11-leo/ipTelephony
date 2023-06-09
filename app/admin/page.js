'use client'
import React,{useState} from 'react'
import { Dashboard,Extensions,Campuses,Administrators,UpdateExtension } from '@/components'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    if (!localStorage.getItem('user')){
        // Redirect
        router.push('/login')
        return (<div></div>)
    }
    const user = localStorage.getItem('user')
    console.log(user)
    const [view,setView] = useState('extensions')
  return (
    <div className='flex h-screen'>
        <div className='w-1/4 bg-green-800 flex flex-col items-center py-4 justify-between'>
            <div className='flex items-end text-white font-semibold'>
                <img
                src='/jkuatLogo2.png'
                alt='logo'
                className='w-[80px]'
                />
                <h2 className='text-xl'>IP Telephony</h2>
            </div>
            <ul className='grid gap-5 list-none text-white font-semibold'>
                <li 
                onClick={() => setView('dashboard')}
                className={`${view === "dashboard" && 'text-slate-900'} cursor-pointer`}>Dashboard</li>
                <li 
                onClick={() => setView('extensions')}
                className={`${view === "extensions" && 'text-slate-900'} cursor-pointer`}>Extensions</li>
                <li
                onClick={() => setView('campuses')}
                className={`${view === "campuses" && 'text-slate-900'} cursor-pointer`}>Campuses</li>
                <li 
                onClick={() => setView('administrators')}
                className={`${view === "administrators" && 'text-slate-900'} cursor-pointer`}>Administrators</li>
            </ul>
            <div className='text-white'>
                <h2>All CopyRights Reserved</h2>
            </div>
        </div>
        <div className='w-3/4 bg-slate-900 flex flex-col items-center text-white pt-6 relative'>
            <div className='absolute top-4 right-4 rounded-full bg-transparent ring-white ring-2 p-6 h-6 w-6 flex items-center justify-center'>
                <h2 
                onClick={() => router.push('/')}
                className='font-bold text-lg cursor-pointer'>
                    {user[0]}
                </h2>
            </div>
            {view === 'dashboard' && <Dashboard/>}
            {view === 'extensions' && <Extensions/>}
            {view === 'campuses' && <Campuses/>}
            {view === 'administrators' && <Administrators/>}
        </div>
    </div>
  )
}

export default page