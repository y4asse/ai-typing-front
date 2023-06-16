import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

const GameDifficulty = () => {
  const [game] = useRecoilState(gameAtom)
  const { difficulty } = game
  return (
    <div className="flex justify-center items-center text-7xl font-extrabold">
      {difficulty === 'easy' ? '簡単' : difficulty === 'normal' ? '普通' : '難しい'}
    </div>
  )
}

export default GameDifficulty
