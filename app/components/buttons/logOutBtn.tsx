'use client'

import { signOut } from 'next-auth/react'
import { TbLogout } from 'react-icons/tb'
import React from 'react'
import { useRouter } from 'next/navigation'

const LogOutBtn = () => {
  const router = useRouter()
  return (
    <button
      className="border-gray-800 border p-4 text-2xl font-bold absolute right-20 shadow-btn bg-btn hover:shadow-btnHover hover:bg-btnHover top-2 rounded-xl  transition-all duration-200"
      onClick={async () => {
        await signOut({
          callbackUrl: '/'
        })
      }}
    >
      <TbLogout className="inline-block mr-3 text-4xl" />
      ログアウト
    </button>
  )
}

export default LogOutBtn
