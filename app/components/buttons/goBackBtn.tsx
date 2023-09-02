'use client'

import { useRouter } from 'next/navigation'
import { AiOutlineRollback } from 'react-icons/ai'

const GoBackBtn = () => {
  const router = useRouter()
  return (
    <button
      className="border border-gray-500 shadow-btn bg-btn hover:bg-btnHover hover:shadow-btnHover hover:text-gray-800 text-center rounded-xl  duration-200 transition-all text-2xl font-semibold    absolute top-3 left-3 px-6 py-3  tracking-widest hover:scale-95"
      onClick={() => router.back()}
    >
      <AiOutlineRollback className="inline-block mr-1" />
      もどる
    </button>
  )
}

export default GoBackBtn
