'use client'

import Link from 'next/link'

type Props = {
  difficulty: 'easy' | 'normal' | 'hard'
}

const SelectDifficultyBtn = ({ difficulty }: Props) => {
  return (
    <Link
      href={`/play/${difficulty}`}
      className=" text-center w-full border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl  tracking-widest"
    >
      {difficulty === 'easy' ? '簡単' : difficulty === 'normal' ? '普通' : '難しい'}
    </Link>
  )
}

export default SelectDifficultyBtn
