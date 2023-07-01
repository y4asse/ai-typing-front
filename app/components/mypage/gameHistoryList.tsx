import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { GameHistory } from '@/types/game'
import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'
import React from 'react'
import GameHistoryItem from './gameHistroyItem'

const getGameHistory = async () => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const session = await getServerSession(authOptions)
  if (session == null) {
    throw new Error('tokenがありません')
  }
  const userId = session.user.uid
  const body = JSON.stringify({
    user_id: userId
  })
  const request = new NextRequest(`${API_URL}/gameHistory`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  try {
    const data: GameHistory[] = await fetch(request).then((res) => {
      if (!res.ok) {
        throw new Error('データを取得できませんでした')
      }
      return res.json()
    })
    return data
  } catch (e) {
    console.log(e)
  }
}

const GameHistoryList = async () => {
  const gameHistory = await getGameHistory()
  return (
    <table className="w-full h-full">
      <tbody>
        {gameHistory?.map((game, index) => {
          return (
            <tr key={index}>
              <GameHistoryItem game={game} />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GameHistoryList
