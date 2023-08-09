'use client'

import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Game } from '@/types/game'
import Spinner from '../utils/spinner'
import { likeOffsetAtom } from '@/recoil/likeOffset'
import { GetGamesByLike } from '@/hooks/getGamesByLike'
import LikeCountWithGameItemgame from './likeCountGameItem'

//この形でとってくる
export type LikeCountWithGame = {
  game: Game
  count: number
}

const GameListByLike = () => {
  const [offset] = useRecoilState(likeOffsetAtom)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [games, setGames] = useState<LikeCountWithGame[] | null>([])
  const limit = 10
  useEffect(() => {
    setIsLoading(true)
    GetGamesByLike(offset * 10, limit).then((res) => {
      setGames(res)
      setIsLoading(false)
    })
  }, [offset])

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center">
        <Spinner />
      </div>
    )
  }
  if (games == null) {
    return (
      <div className="flex text-3xl font-bold justify-center items-center h-full">
        エラーが発生しました.ネットワーク環境を確認してください
      </div>
    )
  }

  return (
    <table className="w-full h-full ">
      <tbody>
        {games.map((likeCountWithGame, index) => {
          return (
            <tr key={index}>
              <LikeCountWithGameItemgame likeCountWithGame={likeCountWithGame} />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GameListByLike
