import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

const GameMode = () => {
  const [game] = useRecoilState(gameAtom)
  const { mode } = game
  return (
    <div className="flex justify-center items-center text-7xl font-extrabold">
      {mode === 'standard' ? 'スタンダード' : mode === 'timeLimit' ? 'タイムリミット' : ''}
    </div>
  )
}

export default GameMode
