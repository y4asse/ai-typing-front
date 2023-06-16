'use client'

import GameDetails from './gameDetails'
import GameMode from './gameMode'
import GameScore from './gameScore'
import GameText from './gameText'
import GameTimer from './gameTimer'

const Playing = () => {
  return (
    <div className="w-1/2 mx-auto h-screen grid grid-rows-3">
      <div className="grid grid-cols-2">
        <GameMode />
        <GameScore />
      </div>
      <GameText />
      <GameDetails />

      {/* <GameTimer /> */}
    </div>
  )
}

export default Playing
