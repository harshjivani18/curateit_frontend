"use client";

import React                from 'react'
import { useRouter }        from 'next/navigation';

const NotFound = () => {
  const router = useRouter()
  
  return (
    <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center'>
      <h1 className='text-5xl font-bold'>404</h1>
      <h3 className='text-2xl'>Not Found</h3>
      <button onClick={() => router.push("/")} className='px-5 py-1 bg-blue-600 rounded-md text-lg text-white mt-2'>Home</button>
    </div>
  )
}

export default NotFound