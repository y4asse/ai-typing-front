'use client'

import { gameAtom } from '@/recoil/gameAtom'
import { useRecoilState } from 'recoil'

const GameText = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  return (
    <div>
      {game.text}
      {game.hiragana}
    </div>
  )
}

export default GameText
