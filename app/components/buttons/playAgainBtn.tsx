'use client'

import { defaultState, gameAtom } from '@/recoil/gameAtom'
import { situationAtom } from '@/recoil/situationAtom'
import { useRecoilState } from 'recoil'
import { FaRedoAlt } from 'react-icons/fa'
import { useEffect } from 'react'

const PlayAgainBtn = () => {
  const [, setGame] = useRecoilState(gameAtom)
  const [, setSituation] = useRecoilState(situationAtom)
  const playAgain = () => {
    setGame((prev) => ({
      ...defaultState,
      thema: prev.thema
    }))
    setSituation({ value: 'thema' })
  }
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playAgain()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <button
      onClick={playAgain}
      className=" text-center w-full  border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl  tracking-widest hover:scale-95"
    >
      <FaRedoAlt className=" inline-block mr-5" />
      もう一度(esc)
    </button>
  )
}

export default PlayAgainBtn
