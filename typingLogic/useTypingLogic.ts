'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { constructTypeSentence } from './constructTypeSentence'
import { useRecoilState } from 'recoil'
import { gameAtom } from '@/recoil/gameAtom'
import { calcScore } from './calcScore'

const useTypingLogic = (
  text: string[]
): {
  textIndex: number
  totalInput: string
  splitSentence: string[]
  hiraganaIndex: number
  romajiCandidates: string[][]
  leftCandidates: string[][]
  requiredRomaji: string[]
  isMissFlash: boolean
} => {
  if (text.length < 1) {
    throw new Error('テキストが存在しません')
  }
  const [game, setGame] = useRecoilState(gameAtom)
  const { timer, typeNum, missTypeNum } = game
  const [inputBuf, setInputBuf] = useState('')
  const [hiraganaIndex, setHiraganaIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  //callback関数でメモ化する
  const constructTypeSentenceCallback = useCallback(() => {
    return constructTypeSentence(text[textIndex])
  }, [textIndex])
  const [splitSentence, setSplitSentence] = useState(constructTypeSentenceCallback().splitSentence)
  const [romajiCandidates, setRomajiCandidates] = useState(constructTypeSentenceCallback().romajiCandidates)
  const [leftCandidates, setLeftCandidate] = useState<string[][]>([])
  const [totalInput, setTotalInput] = useState<string>('')
  const [requiredRomaji, setRequiredRomaji] = useState<string[]>([])
  const [isMissFlash, setIsMissFlash] = useState(false)

  //constructTypeSentenceCallbackがtextindexに依存してるので，set関数もtextindexに依存させる
  useEffect(() => {
    setRomajiCandidates(constructTypeSentenceCallback().romajiCandidates)
  }, [textIndex])

  //requiredRomajiのinputに合わせた更新
  useEffect(() => {
    const matchCandidates = romajiCandidates[hiraganaIndex].filter((romaji) => romaji.startsWith(inputBuf))
    setRequiredRomaji((prev) => {
      const newArray = [...prev]
      newArray[hiraganaIndex] = matchCandidates[0]
      return newArray
    })
  }, [inputBuf])

  //requiredRomajiの初期化
  useEffect(() => {
    romajiCandidates.map((candidate, index) => {
      setRequiredRomaji((prev) => {
        const newArray = [...prev]
        newArray[index] = candidate[0]
        return newArray
      })
    })
  }, [romajiCandidates])

  const goNextText = () => {
    setTextIndex((prev) => (prev += 1))
    setHiraganaIndex(0)
    setSplitSentence(constructTypeSentence(text[textIndex + 1]).splitSentence)
    setRequiredRomaji([])
    setGame((prev) => ({ ...prev, timer: 0 }))
    setTotalInput('')
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
    const candidates = romajiCandidates[hiraganaIndex].filter((romaji) => romaji.startsWith(inputBufNext))
    setLeftCandidate((prev) => [...prev, candidates])
    //候補があるとき（正解の時）
    if (candidates.length > 0) {
      setInputBuf((prev) => prev + typedKey)
      setTotalInput((prev) => (prev += typedKey))
      setGame((prev) => ({ ...prev, totalTypeNum: prev.totalTypeNum + 1, typeNum: prev.typeNum + 1 }))

      //ひらがなができたとき
      if (candidates.length == 1 && candidates[0] === inputBufNext) {
        setHiraganaIndex((prev) => prev + 1)
        setInputBuf('')
        //次のお題に進むとき
        if (hiraganaIndex + 1 > constructTypeSentenceCallback().romajiCandidates.length - 1) {
          const { score: calcscore, WPM } = calcScore(typeNum + 1, timer, missTypeNum)
          setGame((prev) => ({
            ...prev,
            score: prev.score + calcscore,
            missTypeNum: 0,
            typeNum: 0,
            timer: 0,
            totalTimeMiliSec: prev.totalTimeMiliSec + timer
          }))
          goNextText()
        }
      }
    } else {
      //不正解の時
      setIsMissFlash(true)
      setTimeout(() => {
        setIsMissFlash(false)
      }, 100)
      setGame((prev) => ({
        ...prev,
        totalMissTypeNum: prev.totalMissTypeNum + 1,
        missTypeNum: prev.missTypeNum + 1,
        missTypeKey: [...prev.missTypeKey, typedKey]
      }))
    }
  }

  useEffect(() => {
    const count = setInterval(() => {
      setGame((prev) => ({ ...prev, timer: prev.timer + 100 }))
    }, 100)
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
  return {
    textIndex,
    totalInput,
    splitSentence,
    hiraganaIndex,
    romajiCandidates,
    leftCandidates,
    requiredRomaji,
    isMissFlash
  }
}
export default useTypingLogic
