'use client'

import { gameAtom } from '@/recoil/gameAtom'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

const AiModel = () => {
  const list = ['gpt-3.5-turbo', 'gpt-4']
  const [game, setGame] = useRecoilState(gameAtom)
  const { aiModel } = game
  return (
    <div className="flex justify-evenly items-center">
      <span className="text-xl font-bold">AIのモデル：</span>
      {list.map((value, i) => {
        return (
          <span
            key={i}
            className={`text-xl font-bold  p-1 px-10  rounded-full cursor-pointer shadow-btn bg-btn  ${
              value == aiModel && 'bg-black text-white '
            }`}
            onClick={() => setGame({ ...game, aiModel: value })}
          >
            {value == 'gpt-3.5-turbo' ? '高速' : '高精度'}
          </span>
        )
      })}
    </div>
  )
}

export default AiModel
