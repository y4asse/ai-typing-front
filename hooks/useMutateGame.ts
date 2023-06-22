import { gameAtom } from '@/recoil/gameAtom'
import { NextRequest } from 'next/server'
import { useRecoilState } from 'recoil'

export const useMutateGame = () => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const [game] = useRecoilState(gameAtom)
  const { score, thema, mode, text, hiragana } = game
  const body = JSON.stringify({
    score: score,
    inputed_thema: thema,
    mode_id: mode === 'standard' ? 0 : 1,
    text: text,
    hiragana: hiragana
  })
  const request = new NextRequest(`${API_URL}/game`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const createGame = async () => {
    try {
      await fetch(request).then((res) => {
        if (!res.ok) {
          alert('データを登録できませんでした')
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  return { createGame }
}