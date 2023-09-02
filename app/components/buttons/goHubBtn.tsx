'use client'

import Link from 'next/link'
import { MdForest } from 'react-icons/md'

const GoHubBtn = () => {
  return (
    <Link
      href={'/hub'}
      className="border border-gray-500 shadow-btn bg-btn hover:bg-btnHover hover:shadow-btnHover hover:text-gray-800 text-center w-full  rounded-xl py-8   duration-200 transition-all text-2xl font-semibold   tracking-widest hover:scale-95"
    >
      <MdForest className="inline-block mr-5" />
      テキスト広場
    </Link>
  )
}

export default GoHubBtn
