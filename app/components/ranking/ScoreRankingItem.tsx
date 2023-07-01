import { Game } from '@/types/game'
import { format } from 'date-fns'
import React from 'react'

type Props = {
  game: Game
}

const ScoreRankingItem = ({ game }: Props) => {
  return (
    <>
      <td className="pl-10">{game.score}点</td>
      <td className="pl-10">{game.inputed_thema}</td>
      <td>{format(Date.parse(game.created_at), 'yyyy/MM/dd hh:mm')}</td>
    </>
  )
}

export default ScoreRankingItem
