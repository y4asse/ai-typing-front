'use client'

import Link from 'next/link'
import { MdForest } from 'react-icons/md'

const GoHubBtn = ({ isPreparing }: { isPreparing?: boolean }) => {
  if (isPreparing === true) {
    return (
      <button className=" cursor-not-allowed text-center w-full  border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl  tracking-widest">
        <MdForest className="inline-block mr-5" />
        テキスト広場（準備中）
      </button>
    )
  }
  return (
    <Link
      href={'/hub'}
      className=" text-center w-full  border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl  tracking-widest"
    >
      <MdForest className="inline-block mr-5" />
      テキスト広場
    </Link>
  )
}

export default GoHubBtn
