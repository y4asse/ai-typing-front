'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

const GoHomeBtn = () => {
  return (
    <Link
      href={'/'}
      className=" text-center w-full  border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl  tracking-widest hover:scale-95"
    >
      <GiHamburgerMenu className="inline-block mr-5" />
      タイトルへ戻る
    </Link>
  )
}

export default GoHomeBtn
