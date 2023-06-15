'use client'

import { gameAtom } from '@/recoil/gameAtom'
import { useRecoilState } from 'recoil'

const GameScore = () => {
  const [game] = useRecoilState(gameAtom)
  return <div className='flex justify-center items-center text-6xl'>
    スコア:{game.score}</div>
}

export default GameScore
