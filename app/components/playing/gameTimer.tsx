'use client'

import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

const GameTimer = () => {
  const [game] = useRecoilState(gameAtom)
  return (
    <div className=" flex justify-center items-center  text-center font-bold ">
      <div className="relative bg-gray-200 w-full h-10 p-1">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">{game.timer}</span>
        <div className="bg-blue-400 rounded w-1/3 h-full"></div>
      </div>
    </div>
  )
}

export default GameTimer
