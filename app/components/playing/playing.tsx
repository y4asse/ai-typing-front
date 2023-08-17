'use client'

import { useRecoilState } from 'recoil'
import GameDetails from './gameDetails'
import GameMode from './gameMode'
import GameScore from './gameScore'
import GameText from './gameText'
import { gameAtom } from '@/recoil/gameAtom'

const Playing = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-4 grid-rows-3">
      <GameMode />
      <GameScore />
      <GameText />
      <GameDetails />
    </div>
  )
}

export default Playing
