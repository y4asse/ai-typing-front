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
      className="border border-gray-500 bg-btn hover:bg-btnHover hover:shadow-btnHover hover:text-gray-800 text-center  rounded-xl py-8   duration-200 transition-all text-2xl font-semibold   tracking-widest hover:scale-95 w-[300px]"
    >
      <FaRedoAlt className=" inline-block mr-5" />
      もう一度(esc)
    </button>
  )
}

export default PlayAgainBtn
