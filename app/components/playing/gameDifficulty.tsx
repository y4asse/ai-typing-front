import React from 'react'

type Props = {
  difficulty: 'easy' | 'hard' | 'normal'
}

const GameDifficulty = ({ difficulty }: Props) => {
  return (
    <div className="flex justify-center items-center text-7xl font-extrabold">
      {difficulty === 'easy' ? '簡単' : difficulty === 'normal' ? '普通' : '難しい'}
    </div>
  )
}

export default GameDifficulty
