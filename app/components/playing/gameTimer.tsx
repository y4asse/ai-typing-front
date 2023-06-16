'use client'

import { gameAtom } from '@/recoil/gameAtom'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

const GameTimer = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const { timer } = game
  
  return (
    <div className=" flex justify-center items-center  text-center font-bold ">
      <div className="relative bg-gray-200 w-full h-10 p-1">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">{game.timer}</span>
        <div style={{ width: `${timer * 10}%` }} className="bg-blue-400 rounded h-full"></div>
      </div>
    </div>
  )
}

export default GameTimer
