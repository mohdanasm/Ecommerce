import axios from 'axios'
import React, { useState } from 'react'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const Login = ({settoken}) => {

    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')

    const onSubmithandler = async (e)=>{
        try {
            e.preventDefault();
            const response = await axios.post(backendurl+'/api/user/admin',{email,password})
            if(response.data.success){
                settoken(response.data.token)
            }

            else{
                toast.error(response.data.message)
            }
            

        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmithandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium tet-gray-700 mb-2'>Email Address</p>
                        <input onChange={(e)=>setemail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Email' required />
                    </div>

                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium tet-gray-700 mb-2'>Password</p>
                        <input onChange={(e)=>setpassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Password' required />
                    </div>
                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer hover:bg-gray-900 active:bg-slate-200 active:text-gray-800' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
