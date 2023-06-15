'use client'

import { gameAtom } from '@/recoil/gameAtom'
import useTypingLogic from '@/typingLogic/useTypingLogic'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

const GameText = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const [input, setInput] = useState('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  const { hiragana, text } = game
  const { textIndexShow, totalInput } = useTypingLogic(hiragana)
  return (
    <div className="relative">
      <div className="absolute gap-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white h-full min-w-full p-6 rounded-2xl flex flex-col justify-center items-center">
        <h1 className="whitespace-nowrap text-3xl">{text[textIndexShow]}</h1>
        <p className="whitespace-nowrap">{hiragana[textIndexShow]}</p>
        <p>{totalInput}</p>
      </div>
    </div>
  )
}

export default GameText
