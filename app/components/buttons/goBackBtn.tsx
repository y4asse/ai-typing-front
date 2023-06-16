'use client'

import { useRouter } from 'next/navigation'
import { AiOutlineRollback } from 'react-icons/ai'

const GoBackBtn = () => {
  const router = useRouter()
  return (
    <button
      className="border-black border-4 shadow rounded-xl text-2xl font-bold absolute top-3 left-3 px-6 py-3 hover:bg-black hover:text-white transition-all duration-200"
      onClick={() => router.back()}
    >
      <AiOutlineRollback className="inline-block mr-1" />
      もどる
    </button>
  )
}

export default GoBackBtn
