'use client'

import { gameAtom } from '@/recoil/gameAtom'
import { situationAtom } from '@/recoil/situationAtom'
import { useRecoilState } from 'recoil'
import { FaRedoAlt } from 'react-icons/fa'

const PlayAgainBtn = () => {
  const [, setGame] = useRecoilState(gameAtom)
  const [, setSituation] = useRecoilState(situationAtom)
  const handleClick = () => {
    setGame((prev) => ({
      ...prev,
      thema: '',
      score: 0,
      timer: 0,
      text: [],
      hiragana: [],
      totalTypeNum: 0,
      totalMissTypeNum: 0,
      typeNum: 0,
      missTypeNum: 0
    }))
    setSituation({ value: 'thema' })
  }
  return (
    <button
      onClick={handleClick}
      className=" text-center w-full  border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl  tracking-widest"
    >
      <FaRedoAlt className=' inline-block mr-5'/>
      もう一度
    </button>
  )
}

export default PlayAgainBtn
