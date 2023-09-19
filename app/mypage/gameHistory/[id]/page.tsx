import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import GoBackBtn from '@/app/components/buttons/goBackBtn'
import { getFreshIdToken } from '@/hooks/getFreshIdToken'
import { Game } from '@/types/game'
import { calcAccuracy, calcKpm } from '@/typingLogic/calcScore'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'

type CreatedText = {
  id: string
  text: string
  hiragana: string
  game_id: string
}

const fetchGameDetail = async (gameId: string): Promise<GameDetail | null> => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const session = await getServerSession(authOptions)
  if (!session) {
    return null
  }
  const refreshToken = session.user.refreshToken
  const freshIdToken = await getFreshIdToken(refreshToken)
  try {
    const data: GameDetail | null = await fetch(`${API_URL}/gameDetail/${gameId}`, {
      cache: 'force-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${freshIdToken}`
      }
    }).then((res) => {
      if (!res.ok) {
        console.log('データを取得できませんでした' + res.statusText)
        return null
      }
      return res.json()
    })
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

type GameDetail = {
  game: Game
  created_text: CreatedText[]
}

const Page = async ({ params }: { params: { id: string } }) => {
  const gameDetail = await fetchGameDetail(params.id)
  if (gameDetail == null) {
    return notFound()
  }
  const { game, created_text } = gameDetail
  if (created_text.length === 0) {
    return notFound()
  }
  const kpm = calcKpm(game.total_key_count, game.total_time)
  const accuracy = calcAccuracy(game.total_key_count, game.total_miss_type)
  return (
    <div className="py-[100px] overflow-y-scroll w-screen min-h-screen">
      <GoBackBtn className="absolute top-[80px] left-3" />
      <div className="w-[1000px] h-full mx-auto flex flex-col">
        <h1 className="text-3xl font-bold mb-[30px]">あいさつ</h1>
        <div className="border-black border-4 p-10 rounded-xl text-2xl flex flex-col gap-3 mb-[70px]">
          {created_text.map((value) => {
            return <h1 key={value.id}>・{value.text}</h1>
          })}
        </div>
        <div className="flex justify-evenly text-3xl font-bold">
          <p>
            <span className=" text-gray-700 text-2xl  font-semibold">スコア</span> {game.score}
          </p>
          <p>
            <span className=" text-gray-700 text-2xl  font-semibold">ミスタイプ数</span> {game.total_miss_type}
          </p>
          <p>
            <span className=" text-gray-700 text-2xl  font-semibold">KPM</span> {kpm}
          </p>
          <p>
            <span className=" text-gray-700 text-2xl  font-semibold">正確率</span> {accuracy}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
