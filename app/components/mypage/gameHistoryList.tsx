import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { GameHistory } from '@/types/game'
import { getServerSession } from 'next-auth'
import React from 'react'
import GameHistoryItem from './gameHistroyItem'
import { getFreshIdToken } from '@/hooks/getFreshIdToken'

const getGameHistory = async () => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const session = await getServerSession(authOptions)
  if (session == null) {
    throw new Error('tokenがありません')
  }
  const refreshToken = session.user.refreshToken
  const freshIdToken = await getFreshIdToken(refreshToken)

  //消す
  const userId = session.user.uid
  console.log(userId)
  console.log(freshIdToken)

  try {
    const limit = 5
    const data: GameHistory[] = await fetch(`${API_URL}/gameHistory?limit=${limit}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${freshIdToken}`,
        'Content-Type': 'application/json'
      },
      cache: 'force-cache'
    }).then((res) => {
      if (!res.ok) {
        throw new Error('データを取得できませんでした')
      }
      return res.json()
    })
    return data
  } catch (e) {
    console.error(e)
    return null
  }
}

const GameHistoryList = async () => {
  const gameHistory = await getGameHistory()
  if (gameHistory == null) {
    return (
      <div className="flex text-3xl font-bold justify-center items-center h-full">
        エラーが発生しました.ネットワーク環境を確認してください
      </div>
    )
  }

  return (
    <div>
      <div className="border-black border-4 rounded-xl p-5 w-full  text-2xl">
        {gameHistory.length === 0 ? (
          <div className="flex text-3xl font-bold justify-center items-center h-full">
            まだデータがありません．プレイしてみましょう！
          </div>
        ) : (
          <table className="w-full h-full">
            <tbody>
              {gameHistory.map((game, index) => {
                if (index > 9) return
                return (
                  <tr key={index}>
                    <GameHistoryItem game={game} />
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default GameHistoryList
