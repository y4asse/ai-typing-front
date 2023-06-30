'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { TbLogout } from 'react-icons/tb'
import { TbLogin } from 'react-icons/tb'
import { signOut, useSession } from 'next-auth/react'

const AuthBtn = async () => {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <button
      className="border-black border-4 p-4 text-2xl font-bold absolute right-2 top-2 rounded-xl hover:bg-black hover:text-white transition-all duration-200"
      onClick={() => (session ? router.push('/mypage') : router.push('/auth'))}
    >
      {session ? (
        <TbLogout className="inline-block mr-3 text-4xl" />
      ) : (
        <TbLogin className="inline-block mr-3 text-4xl" />
      )}

      {session ? 'マイページへ' : 'ログイン'}
    </button>
  )
}

export default AuthBtn
