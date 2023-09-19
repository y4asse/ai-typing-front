'use client'

import { signOut } from 'next-auth/react'
import { TbLogout } from 'react-icons/tb'
import React from 'react'
import { useRouter } from 'next/navigation'

const LogOutBtn = () => {
  const router = useRouter()
  return (
    <button
      className="px-4 py-2 text-lg font-bold right-20 shadow-btn  bg-btn hover:shadow-btnHover hover:bg-btnHover rounded-xl  transition-all duration-200"
      onClick={async () => {
        await signOut({
          callbackUrl: '/'
        })
      }}
    >
      <TbLogout className="inline-block mr-3 text-2xl" />
      ログアウト
    </button>
  )
}

export default LogOutBtn
