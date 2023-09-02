'use client'

import Link from 'next/link'
import { FaRocket } from 'react-icons/fa'

const GoModeBtn = () => {
  return (
    <Link
      href={'/play/standard'}
      className={`border border-gray-500 shadow-btn bg-btn hover:bg-btnHover hover:shadow-btnHover hover:text-gray-800 text-center w-full  rounded-xl py-8   duration-200 transition-all text-2xl font-semibold   tracking-widest hover:scale-95`}
    >
      <FaRocket className=" inline-block mr-5" />
      スタート
    </Link>
  )
}

export default GoModeBtn
