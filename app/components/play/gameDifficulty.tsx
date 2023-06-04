import React from 'react'

type Props = {
  difficulty: 'easy' | 'hard' | 'normal'
}

const GameDifficulty = ({ difficulty }: Props) => {
  return <div>{difficulty === 'easy' ? '簡単' : difficulty === 'normal' ? '普通' : '難しい'}</div>
}

export default GameDifficulty
