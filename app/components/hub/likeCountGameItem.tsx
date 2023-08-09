'use client'

import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import { LikeCountWithGame } from './gameListByLike'
import { AiOutlineHeart } from 'react-icons/ai'

type Props = {
  likeCountWithGame: LikeCountWithGame
}

const LikeCountWithGameItem = ({ likeCountWithGame }: Props) => {
  const { game, count } = likeCountWithGame
  return (
    <>
      <td className="text-center">
        <Link className="pl-10 cursor-pointer underline" href={`/hub/${game.id}`}>
          {game.inputed_thema}
        </Link>
      </td>
      <td className="text-center w-0">
        <AiOutlineHeart className="inline-block mr-3" />
      </td>
      <td className="">{count}</td>
      <td className="text-center w-1/3">{format(Date.parse(game.created_at), 'yyyy/MM/dd hh:mm')}</td>
    </>
  )
}

export default LikeCountWithGameItem
