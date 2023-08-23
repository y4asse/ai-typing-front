import { gameAtom } from '@/recoil/gameAtom'
import { Game } from '@/types/game'
import { useSession } from 'next-auth/react'
import { NextRequest } from 'next/server'
import { useRecoilState } from 'recoil'
import { getFreshIdToken } from './getFreshIdToken'
import { FaMeteor } from 'react-icons/fa'

export const useMutateGame = () => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const [game, setGame] = useRecoilState(gameAtom)
  const {
    score,
    thema,
    mode,
    text,
    hiragana,
    id,
    totalTypeNum,
    totalMissTypeNum,
    totalTimeMiliSec,
    aiModel,
    detail,
    disableRanking
  } = game
  const { data: session } = useSession()
  const refreshToken = session?.user.refreshToken
  const createGame = async () => {
    const body = JSON.stringify({
      score: score,
      inputed_thema: thema,
      mode_id: mode === 'standard' ? 0 : 1,
      text: text,
      hiragana: hiragana,
      ai_model: aiModel,
      detail: detail,
      disable_ranking: disableRanking
    })
    const freshIdToken = await getFreshIdToken(refreshToken ? refreshToken : '')
    const request = new NextRequest(`${API_URL}/game`, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${freshIdToken}`
      }
    })
    try {
      await fetch(request).then(async (res) => {
        if (!res.ok) {
          console.log(res.statusText)
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
      score: score,
      total_key_count: totalTypeNum,
      total_miss_type: totalMissTypeNum,
      total_time: totalTimeMiliSec
    })
    const request = new NextRequest(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/updateGameScore/${id}`, {
      method: 'POST',
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
