import { Game } from '@/types/game'
import { NextRequest } from 'next/server'
import ScoreRankingItem from './ScoreRankingItem'

const getScoreRanking = async () => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const request = new NextRequest(`${API_URL}/gameRanking`, {
    method: 'GET',
    cache: 'no-store'
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

const ScoreRankingList = async () => {
  const games = await getScoreRanking()
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
              <th>{index + 1}位</th>
              <ScoreRankingItem game={game} />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ScoreRankingList
