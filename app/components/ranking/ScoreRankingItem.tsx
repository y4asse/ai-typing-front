'use client'

import { Game } from '@/types/game'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

type Props = {
  game: Game
}

const ScoreRankingItem = ({ game }: Props) => {
  return (
    <>
      <td className="pl-10">{game.score}点</td>
      <td>
        <Link className="pl-10 cursor-pointer underline" href={`/hub/${game.id}`}>
          {game.inputed_thema}
        </Link>
      </td>
      <td>{format(Date.parse(game.created_at), 'yyyy/MM/dd hh:mm')}</td>
    </>
  )
}

export default ScoreRankingItem
