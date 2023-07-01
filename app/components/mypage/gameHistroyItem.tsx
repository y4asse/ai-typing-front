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
  return (
    <>
      <th className="pl-10  underline">
        <span className="cursor-pointer" onClick={() => router.push(`/mypage/gameHistory/${game.id}`)}>
          {game.inputed_thema}
        </span>
      </th>
      <td className="pl-10">{game.score}点</td>
      <td>{format(Date.parse(game.created_at), 'yyyy/MM/dd hh:mm')}</td>
    </>
  )
}

export default GameHistoryItem
