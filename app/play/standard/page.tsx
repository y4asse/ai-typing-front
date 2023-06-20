'use client'

import CreatingText from '@/app/components/playing/creating'
import Thema from '@/app/components/playing/thema'
import { situationAtom } from '@/recoil/situationAtom'
import { gameAtom } from '@/recoil/gameAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Created from '@/app/components/playing/created'
import Playing from '@/app/components/playing/playing'
import { NextRequest } from 'next/server'
import ScoreView from '@/app/components/playing/scoreView'
import { ModeTypes } from '@/types/mode'
import { useEffect } from 'react'

type AiResponse = {
  text: string[]
  hiragana: string[]
  error?: string
}

const Standard = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const [situation, setSituation] = useRecoilState(situationAtom)
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL

  const handleClick = async () => {
    try {
      if (game.thema.trim() === '') {
        throw new Error('テーマを入力してください')
      }
      if (game.thema.trim().length > 10) {
        throw new Error('テーマは10文字以内で入力してください')
      }
      if (!API_URL) {
        throw new Error('サーバーエラー: 環境変数が設定されていません')
      }
      const request = new NextRequest(`${API_URL}/aiText`, {
        method: 'POST',
        body: JSON.stringify({ thema: game.thema }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('creating text...')
      setSituation({ value: 'creating' })
      await fetch(request)
        .then(async (res) => {
          const data: AiResponse = await res.json()
          if (!res.ok) {
            throw new Error(`${data.error}`)
          }
          //成功したときの処理
          setGame((prev) => {
            return { ...prev, text: data.text, hiragana: data.hiragana, mode: 'standard' }
          })
          setSituation({ value: 'created' })
        })
        .catch((error: Error) => {
          alert(`サーバーエラー: ${error.message}`)
          setSituation({ value: 'thema' })
        })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  //不正防止のためページを離れたらリセットする
  useEffect(() => {
    return () => {
      setGame((prev) => ({
        ...prev,
        thema: '',
        score: 0,
        timer: 0,
        text: [],
        hiragana: [],
        totalTypeNum: 0,
        totalMissTypeNum: 0,
        typeNum: 0,
        missTypeNum: 0
      }))
      setSituation({ value: 'thema' })
    }
  }, [])
  return (
    <>
      {situation.value === 'thema' ? (
        <Thema handleClick={handleClick} />
      ) : situation.value === 'creating' ? (
        <CreatingText />
      ) : situation.value === 'created' ? (
        <Created />
      ) : situation.value === 'playing' ? (
        <Playing />
      ) : (
        <ScoreView />
      )}
    </>
  )
}

export default Standard
