'use client'

import Link from 'next/link'
import { FaRocket } from 'react-icons/fa'

const GoModeBtn = () => {
  return (
    <Link
      href={'/play/standard'}
      className=" text-center w-full  border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl  tracking-widest hover:scale-95"
    >
      <FaRocket className=" inline-block mr-5" />
      スタート
    </Link>
  )
}

export default GoModeBtn
