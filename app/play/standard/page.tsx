'use client'

import CreatingText from '@/app/components/playing/creating'
import Thema from '@/app/components/playing/thema'
import { situationAtom } from '@/recoil/situationAtom'
import { gameAtom } from '@/recoil/gameAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Created from '@/app/components/playing/created'
import Playing from '@/app/components/playing/playing'
import ScoreView from '@/app/components/playing/scoreView'
import { useEffect } from 'react'


const Standard = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const [situation, setSituation] = useRecoilState(situationAtom)

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
        <Thema />
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
