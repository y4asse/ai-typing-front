'use client'

import { Game } from '@/types/game'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

type Props = {
  game: Game
}

const HubListItem = ({ game }: Props) => {
  return (
    <>
      <td className='text-center w-2/3'>
        <Link className="pl-10 cursor-pointer underline" href={`/hub/${game.id}`}>
          {game.inputed_thema}
        </Link>
      </td>
      <td className='w-1/3 text-center'>{format(Date.parse(game.created_at), 'yyyy/MM/dd hh:mm')}</td>
    </>
  )
}

export default HubListItem
