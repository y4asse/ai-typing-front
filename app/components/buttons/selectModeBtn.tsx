'use client'

import Link from 'next/link'

type Props = {
  mode: "standard" | "timeLimit"
}

const SelectModeBtn = ({ mode }: Props) => {
  return (
    <Link
      href={`/play/${mode}`}
      className=" text-center w-full border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl  tracking-widest"
    >
      {mode === 'standard' ? 'スタンダードコース' : mode === 'timeLimit' ? 'タイムリミットコース' : ''}
    </Link>
  )
}

export default SelectModeBtn
