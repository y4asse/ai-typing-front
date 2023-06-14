'use client'

import { gameAtom } from '@/recoil/gameAtom'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'



const GameText = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const [input, setInput] = useState('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  const handleInput = (e: KeyboardEvent) => {
    e.key
  }

  useEffect(() => {
    document.addEventListener('keydown', handleInput, false)
    return () => {
      document.removeEventListener('keydown', handleInput, false)
    }
  }, [])
  return (
    <div className="relative">
      <div className="absolute gap-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white h-full min-w-full p-6 rounded-2xl flex flex-col justify-center items-center">
        <h1 className="whitespace-nowrap text-3xl">{game.text[1]}</h1>
        <p className="whitespace-nowrap">{game.hiragana[1]}</p>
        <p>{input}</p>
      </div>
    </div>
  )
}

export default GameText
