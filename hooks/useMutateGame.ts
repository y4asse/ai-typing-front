import { gameAtom } from '@/recoil/gameAtom'
import { Game } from '@/types/game'
import { useSession } from 'next-auth/react'
import { NextRequest } from 'next/server'
import { useRecoilState } from 'recoil'

export const useMutateGame = () => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const [game, setGame] = useRecoilState(gameAtom)
  const { score, thema, mode, text, hiragana, id } = game
  const { data: session } = useSession()
  const userId = session?.user.uid
  const createGame = async () => {
    const body = JSON.stringify({
      score: score,
      inputed_thema: thema,
      mode_id: mode === 'standard' ? 0 : 1,
      text: text,
      hiragana: hiragana,
      user_id: userId ? userId : ''
    })
    const request = new NextRequest(`${API_URL}/game`, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    try {
      await fetch(request).then(async (res) => {
        if (!res.ok) {
          alert('データを登録できませんでした')
        }
        const data: Game = await res.json()
        setGame((prev) => ({ ...prev, id: data.id }))
      })
    } catch (e) {
      alert('データを登録できませんでした')
    }
  }

  const updateGameScore = async () => {
    const body = JSON.stringify({
      score: score
    })
    const request = new NextRequest(`${API_URL}/gameScore/${id}`, {
      method: 'PUT',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    try {
      await fetch(request).then((res) => {
        if (!res.ok) {
          alert('データを登録できませんでした')
        }
      })
    } catch (e) {
      alert('データを登録できませんでした')
    }
  }

  return { createGame, updateGameScore }
}
