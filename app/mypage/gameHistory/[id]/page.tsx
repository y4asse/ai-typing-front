import GoBackBtn from '@/app/components/buttons/goBackBtn'
import { Game } from '@/types/game'
import { calcAccuracy, calcKpm } from '@/typingLogic/calcScore'
import { notFound } from 'next/navigation'
import React from 'react'

type CreatedText = {
  id: string
  text: string
  hiragana: string
  game_id: string
  is_post: false
}

const fetchGameText = async (gameId: string) => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL

  try {
    const data: CreatedText[] = await fetch(`${API_URL}/createdText/${gameId}`, {
      cache: 'force-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error('データを取得できませんでした' + res.statusText)
      }
      return res.json()
    })
    return data
  } catch (e) {
    console.log(e)
    return []
  }
}

const fetchGameDetail = async (gameId: string): Promise<GameDetail | null> => {
  return {
    game: {
      id: '1',
      user_id: '1',
      score: 3000,
      inputed_thema: 'こんにちは',
      created_at: '2021-09-05T12:00:00.000Z',
      mode_id: 1,
      total_key_count: 138,
      total_miss_type: 1,
      total_time: 30000,
      disable_ranking: false,
      ai_model: 'string',
      detail: 'string'
    },
    createdText: [
      {
        id: '1',
        text: 'こんにちは',
        hiragana: 'こんにちは',
        game_id: '1',
        is_post: false
      },
      {
        id: '1',
        text: 'こんにちは',
        hiragana: 'こんにちは',
        game_id: '1',
        is_post: false
      },
      {
        id: '1',
        text: 'こんにちは',
        hiragana: 'こんにちは',
        game_id: '1',
        is_post: false
      },
      {
        id: '1',
        text: 'こんにちは',
        hiragana: 'こんにちは',
        game_id: '1',
        is_post: false
      },
      {
        id: '1',
        text: 'こんにちは',
        hiragana: 'こんにちは',
        game_id: '1',
        is_post: false
      }
    ]
  }

  // const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  // try {
  //   const data: GameDetail | null = await fetch(`${API_URL}/gameDetail/${gameId}`, {
  //     cache: 'force-cache',
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //       //user情報必要？？
  //     }
  //   }).then((res) => {
  //     if (!res.ok) {
  //       console.log('データを取得できませんでした' + res.statusText)
  //       return null
  //     }
  //     return res.json()
  //   })
  //   return data
  // } catch (e) {
  //   console.log(e)
  //   return null
  // }
}

type GameDetail = {
  game: Game
  createdText: CreatedText[]
}

const Page = async ({ params }: { params: { id: string } }) => {
  const gameDetail = await fetchGameDetail(params.id)
  if (gameDetail == null) {
    return notFound()
  }
  const { game, createdText } = gameDetail
  if (createdText.length === 0) {
    return notFound()
  }
  const kpm = calcKpm(game.total_key_count, game.total_time)
  const accuracy = calcAccuracy(game.total_key_count, game.total_miss_type)
  return (
    <div className="h-screen pt-[100px]">
      <GoBackBtn className="absolute top-[80px] left-3" />
      <div className="w-[1000px] h-full mx-auto flex flex-col">
        <h1 className="text-3xl font-bold mb-[30px]">あいさつ</h1>
        <div className="border-black border-4 p-10 rounded-xl text-2xl flex flex-col gap-3 mb-[70px]">
          {createdText.map((value) => {
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
