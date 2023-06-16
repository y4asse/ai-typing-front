'use client'

import GameDifficulty from './gameDifficulty'
import GameScore from './gameScore'
import GameText from './gameText'
import GameTimer from './gameTimer'


const Playing = () => {
  return (
    <div className="w-1/2 mx-auto h-screen grid grid-rows-3">
      <div className='grid grid-cols-2'>
        <GameDifficulty/>
        <GameScore />
      </div>
      <GameText />
      <GameTimer />
    </div>
  )
}

export default Playing
