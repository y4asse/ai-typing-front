'use client'

import { GameHistory } from '@/types/game'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  game: GameHistory
}

const GameHistoryItem = ({ game }: Props) => {
  const router = useRouter()
  console.log('renderd item')
  return (
    <>
      <th className="pl-10 cursor-pointer underline" onClick={() => router.push(`/`)}>
        {game.inputed_thema}
      </th>
      <td className="pl-10">{game.score}点</td>
      <td>{format(Date.parse(game.created_at), 'yyyy/MM/dd hh:mm')}</td>
    </>
  )
}

export default GameHistoryItem
