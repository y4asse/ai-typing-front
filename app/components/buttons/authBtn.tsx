'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { TbLogin } from 'react-icons/tb'
import { useSession } from 'next-auth/react'
import { FaHome } from 'react-icons/fa'
import Link from 'next/link'

const AuthBtn = async () => {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <>
      {session ? (
        <Link
          className="border-black border-4 p-4 text-2xl font-bold absolute right-2 top-2 rounded-xl hover:bg-black hover:text-white transition-all duration-200"
          href={'/mypage'}
        >
          <FaHome className="inline-block mr-3 text-4xl" />
          マイページへ
        </Link>
      ) : (
        <Link
          className="border-black border-4 p-4 text-2xl font-bold absolute right-2 top-2 rounded-xl hover:bg-black hover:text-white transition-all duration-200"
          href={'/auth'}
        >
          <TbLogin className="inline-block mr-3 text-4xl" />
          ログイン
        </Link>
      )}
    </>
  )
}

export default AuthBtn
