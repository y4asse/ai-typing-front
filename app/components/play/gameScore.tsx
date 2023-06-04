'use client'

import { gameAtom } from '@/recoil/gameAtom'
import { useRecoilState } from 'recoil'

const GameScore = () => {
  const [game] = useRecoilState(gameAtom)
  return <div className=''>{game.score}</div>
}

export default GameScore
