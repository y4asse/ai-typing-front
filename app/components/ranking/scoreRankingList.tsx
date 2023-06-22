import { Game } from '@/types/game'
import { NextRequest } from 'next/server'
import ScoreRankingItem from './ScoreRankingItem'

const getScoreRanking = async () => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const request = new NextRequest(`${API_URL}/gameRanking`, {
    method: 'GET'
  })
  const data: Game[] = await fetch(request).then((res) => {
    return res.json()
  })
  return data
}

const ScoreRankingList = async () => {
  const games: Game[] = await getScoreRanking()
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
