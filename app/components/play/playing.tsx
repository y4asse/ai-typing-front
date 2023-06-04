'use client'

import GameDifficulty from './gameDifficulty'
import GameScore from './gameScore'
import GameText from './gameText'
import GameTimer from './gameTimer'

type Props = {
  difficulty: 'easy' | 'hard' | 'normal'
}

const Playing = ({ difficulty }: Props) => {
  return (
    <div className="h-screen">
      <GameDifficulty difficulty={difficulty} />
      <GameScore />
      <GameText />
      <GameTimer />
    </div>
  )
}

export default Playing
