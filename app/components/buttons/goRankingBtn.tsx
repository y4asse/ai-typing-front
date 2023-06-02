'use client'

import Link from 'next/link'
import { GiStairs } from 'react-icons/gi'

const GoRankingBtn = () => {
  return (
    <Link
      href={'/ranking'}
      className=" text-center w-full  border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow shadow-gray-400 tracking-widest"
    >
      <GiStairs className="inline-block mr-5" />
      ランキング
    </Link>
  )
}

export default GoRankingBtn
