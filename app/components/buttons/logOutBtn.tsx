'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

const LogOutBtn = () => {
  return (
    <button
      className="border-black border-4 p-4 text-2xl font-bold absolute right-2 top-2 rounded-xl hover:bg-black hover:text-white transition-all duration-200"
      onClick={() => signOut()}
    >
      ログアウト
    </button>
  )
}

export default LogOutBtn
