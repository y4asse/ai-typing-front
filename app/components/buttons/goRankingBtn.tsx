'use client'

import Link from 'next/link'
import { GiStairs } from 'react-icons/gi'

const GoRankingBtn = () => {
  return (
    <Link
      href={'/ranking'}
      className="border border-gray-500 shadow-btn bg-btn hover:bg-btnHover hover:shadow-btnHover hover:text-gray-800 text-center w-full  rounded-xl py-8   duration-200 transition-all text-2xl font-semibold   tracking-widest hover:scale-95"
    >
      <GiStairs className="inline-block mr-5" />
      ランキング
    </Link>
  )
}

export default GoRankingBtn
