'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { IoReloadSharp } from 'react-icons/io5'
const RefreshBtn = () => {
  const router = useRouter()
  return <IoReloadSharp onClick={() => router.refresh()} className="absolute text-4xl right-5 top-5 cursor-pointer" />
}

export default RefreshBtn
