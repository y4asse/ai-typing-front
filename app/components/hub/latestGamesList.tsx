import { Game } from '@/types/game'
import { NextRequest } from 'next/server'
import React from 'react'
import HubListItem from './hubListItem'

const getLatestGames = async () => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const body = JSON.stringify({ offset: 0 })
  const request = new NextRequest(`${API_URL}/latestGames`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  try {
    const data: Game[] = await fetch(request).then((res) => {
      if (!res.ok) {
        throw new Error('データを取得できませんでした')
      }
      return res.json()
    })
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

const LatestGamesList = async () => {
  const games = await getLatestGames()
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
