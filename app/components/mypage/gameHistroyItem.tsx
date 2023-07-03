'use client'

import { GameHistory } from '@/types/game'
import { format } from 'date-fns'
import Link from 'next/link'
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
        <Link className="cursor-pointer" href={`/mypage/gameHistory/${game.id}`}>
          {game.inputed_thema}
        </Link>
      </th>
      <td className="pl-10">{game.score}点</td>
      <td>{format(Date.parse(game.created_at), 'yyyy/MM/dd hh:mm')}</td>
    </>
  )
}

export default GameHistoryItem
