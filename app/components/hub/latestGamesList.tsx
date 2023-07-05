'use client'

import React, { useEffect, useState } from 'react'
import HubListItem from './hubListItem'
import { useRecoilState } from 'recoil'
import { hubPageNationOffsetAtom } from '@/recoil/hubPagenationAtom'
import { getLatestGames } from '@/hooks/getLatestGames'
import { Game } from '@/types/game'
import Spinner from '../utils/spinner'

const LatestGamesList = () => {
  const [offset] = useRecoilState(hubPageNationOffsetAtom)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [games, setGames] = useState<Game[] | null>([])
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const res = await getLatestGames(offset)
      setGames(res)
    }
    fetchData().then(() => setIsLoading(false))
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
        {games.map((game, index) => {
          return (
            <tr key={index}>
              <HubListItem game={game} />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default LatestGamesList
