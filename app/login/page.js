'use client'
import React,{useState} from 'react'
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'


const page = () => {
    const [identity,setIdentity] = useState('')
    const [pass,setPass] = useState('')
    const [errror,setError] = useState('')
    const [message,setMessage] = useState('')

    const router = useRouter()

    const url = 'http://localhost:4040/api/login'
    const {data,isLoading} = useQuery({
        queryKey:'details',
        queryFn: async () => {
            // await wait(2000)
            const {data} = await axios.get(url)
            return data
        }
    })

    if(isLoading) return (<div></div>)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(identity, pass)
        const success = data.admins.filter((s) => s.username == identity && s.password == pass).map((d) => d)
        if (success.length < 1) {
            setError('Incorrect Details')
            return
        }
        const userData = {
            username:success[0].username,
            email:success[0].email,
        }
        setMessage('Success')
        window.localStorage.setItem('user',success[0].username)
        router.push('/admin')

    }
  return (
    <div className='h-screen flex'>
        <div 
        className='w-4/6 bg-green-800 bg-hero'>
            
        </div>
        <div className='w-2/6 bg-white flex flex-col items-center justify-center py-20'>
            <div className='mb-6'>
                <img
                className='w-[100px]'
                alt='logo'
                src='/jkuatLogo2.png'
                />    
                <h2 className='font-semibold text-slate-900 text-2xl '>IP Telephony</h2>
            </div>

            {/* Form */}
            <form 
            onSubmit={handleSubmit}
            className='font-semibold grid gap-4 w-[400px]'>
                <div className='flex w-full flex-col'>
                    <label htmlFor="">Identity</label>
                    <input 
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    placeholder='Email || Username'
                    className='flex border-2 border-blue-800 px-2 py-1 '
                    type="text" />
                </div>
                <div className='flex w-full flex-col'>
                    <label htmlFor="">Password</label>
                    <input 
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder='Password'
                    className='flex border-2 border-blue-800 px-2 py-1'
                    type="password" />
                </div>
                <button type='submit' className='flex justify-center py-2 rounded-sm bg-green-800 text-white'>Log In</button>
            </form>

            <Link
            href='#'
            className='text-blue-900 mt-6'
            >Forgot Password</Link>


        </div>
    </div>
  )
}

export default page