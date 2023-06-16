import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

const ScoreView = () => {
  const [game] = useRecoilState(gameAtom)
  const { score } = game
  return (
    <div className="h-screen flex justify-center items-center">
      <div>{score}</div>
    </div>
  )
}

export default ScoreView