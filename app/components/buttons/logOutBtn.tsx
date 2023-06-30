'use client'

import { signOut } from 'next-auth/react'
import { TbLogout } from 'react-icons/tb'
import React from 'react'
import { useRouter } from 'next/navigation'

const LogOutBtn = () => {
  const router = useRouter()
  return (
    <button
      className="border-black border-4 p-4 text-2xl font-bold absolute right-2 top-2 rounded-xl hover:bg-black hover:text-white transition-all duration-200"
      onClick={async () => {
        await signOut()
      }}
    >
      <TbLogout className="inline-block mr-3 text-4xl" />
      ログアウト
    </button>
  )
}

export default LogOutBtn
