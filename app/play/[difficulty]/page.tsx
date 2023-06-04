'use client'

import CreatingText from '@/app/components/play/creating'
import Thema from '@/app/components/play/thema'
import { situationAtom } from '@/recoil/situationAtom'
import { gameAtom } from '@/recoil/gameAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Created from '@/app/components/play/created'
import Playing from '@/app/components/play/playing'
import { notFound } from 'next/navigation'

type AiResponse = {
  text: string[]
}

type Props = {
  params: {
    difficulty: 'easy' | 'hard' | 'normal'
  }
}

const Play = ({ params }: Props) => {
  if (params.difficulty !== 'easy' && params.difficulty !== 'hard' && params.difficulty !== 'normal') {
    return notFound()
  }
  const [situation] = useRecoilState(situationAtom)
  const [game] = useRecoilState(gameAtom)
  const setGame = useSetRecoilState(gameAtom)
  const setSituation = useSetRecoilState(situationAtom)
  const handleClick = async () => {
    if (game.thema === '') {
      alert('テーマを入力してください')
      return
    }
    setSituation({ value: 'creating' })
    await fetch('http://localhost:8080/aiText', {
      body: JSON.stringify({ thema: game.thema }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(async (res) => {
        if (!res.ok) {
          alert('サーバーエラーが発生しました．もう一度お試しください．')
          setSituation({ value: 'thema' })
          return
        }
        //成功したときの処理
        const data: AiResponse = await res.json()
        setGame((prev) => {
          return { ...prev, text: data.text }
        })
        setSituation({ value: 'created' })
      })
      .catch((error) => {
        alert('通信エラーが発生しました．通信環境を確認してください')
        setSituation({ value: 'thema' })
        return
      })
  }
  switch (situation.value) {
    case 'thema':
      return <Playing difficulty={params.difficulty} />
    // return <Thema handleClick={handleClick}/>
    case 'creating':
      return <CreatingText />
    case 'created':
      return <Created />
    case 'playing':
    // return <Thema />
    case 'score':
    // return <Thema />
  }
}

export default Play
