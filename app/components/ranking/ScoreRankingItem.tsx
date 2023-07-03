'use client'

import { Game } from '@/types/game'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  game: Game
}

const ScoreRankingItem = ({ game }: Props) => {
  const router = useRouter()
  return (
    <>
      <td className="pl-10">{game.score}点</td>
      <td className="pl-10 cursor-pointer underline" onClick={() => router.push(`/hub/${game.id}`)}>
        {game.inputed_thema}
      </td>
      <td>{format(Date.parse(game.created_at), 'yyyy/MM/dd hh:mm')}</td>
    </>
  )
}

export default ScoreRankingItem
