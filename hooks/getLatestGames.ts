import { Game } from '@/types/game'
import { NextRequest } from 'next/server'

export const getLatestGames = async (offset: number) => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const body = JSON.stringify({ offset })
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
