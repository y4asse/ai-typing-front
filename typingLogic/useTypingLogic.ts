'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { constructTypeSentence } from './constructTypeSentence'
import { useRecoilState } from 'recoil'
import { gameAtom } from '@/recoil/gameAtom'
import { setDefaultHighWaterMark } from 'stream'

const useTypingLogic = (
  text: string[]
): { textIndex: number; totalInput: string; splitSentence: string[]; hiraganaIndex: number } => {
  if (text.length < 1) {
    throw new Error('テキストが存在しません')
  }
  const [totalInput, setTotalInput] = useState('')
  const [game, setGame] = useRecoilState(gameAtom)
  const { timer } = game
  const [inputBuf, setInputBuf] = useState('')
  const [hiraganaIndex, setHiraganaIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const constructTypeSentenceCallback = useCallback(() => {
    return constructTypeSentence(text[textIndex])
  }, [textIndex])
  const [splitSentence, setSplitSentence] = useState(constructTypeSentenceCallback().splitSentence)

  const goNextText = () => {
    setTextIndex((prev) => (prev += 1))
    setHiraganaIndex(0)
    setTotalInput('')
    setSplitSentence(constructTypeSentence(text[textIndex + 1]).splitSentence)
    const time = 10
    setGame((prev) => ({ ...prev, timer: time }))
  }

  const handleInput = (e: KeyboardEvent) => {
    //終了後
    if (textIndex > text.length - 1) {
      return
    }
    const typedKey = e.key
    if (typedKey == 'Shift') {
      return
    }
    const inputBufNext = inputBuf + typedKey
    //タイプした文字を入れてみて候補があるかを確認
    // const candidates = romajiCandidates[hiraganaIndex].filter((romaji) => romaji.startsWith(inputBufNext))
    const candidates = constructTypeSentenceCallback().romajiCandidates[hiraganaIndex].filter((romaji) =>
      romaji.startsWith(inputBufNext)
    )
    //候補があるとき（正解の時）
    if (candidates.length > 0) {
      setInputBuf((prev) => prev + typedKey)
      setTotalInput((prev) => prev + typedKey)
      setGame((prev) => {
        const score = prev.score + 10
        return { ...prev, score }
      })
      //ひらがなができたとき
      if (candidates.length == 1 && candidates[0] === inputBufNext) {
        setHiraganaIndex((prev) => (prev += 1))
        setInputBuf('')
        //次のお題に進むとき
        if (hiraganaIndex + 1 > constructTypeSentenceCallback().romajiCandidates.length - 1) {
          goNextText()
        }
      }
    } else {
      //不正解の時
      setGame((prev) => ({ ...prev, score: prev.score - 10 }))
    }
  }

  useEffect(() => {
    if (timer < 1) {
      goNextText()
    }
  }, [timer])

  useEffect(() => {
    const count = setInterval(() => {
      setGame((prev) => ({ ...prev, timer: prev.timer - 1 }))
    }, 1000)
    return () => {
      clearInterval(count)
    }
  }, [textIndex])

  useEffect(() => {
    document.addEventListener('keydown', handleInput, false)
    return () => {
      document.removeEventListener('keydown', handleInput, false)
    }
  }, [handleInput])
  return { textIndex, totalInput, splitSentence, hiraganaIndex }
}
export default useTypingLogic
