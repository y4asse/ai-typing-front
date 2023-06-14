'use client'

import { getMappingData } from '@/data/data'
import React, { useCallback, useEffect, useState } from 'react'

type Res = {
  splitSentence: string[] //きゅ，う，きゅう，しゃ
  romajiCandidates: string[][] //[[],[],[],[],[]]
}

const mappingData = getMappingData()

const constructTypeSentence = (hiragana: string): Res => {
  const parsedStr: string[] = []
  const judge: string[][] = []
  let i: number = 0
  while (i < hiragana.length) {
    const uni = hiragana[i]
    const bi = i + 1 < hiragana.length ? hiragana[i] + hiragana[i + 1] : ''
    const tri = i + 2 < hiragana.length ? hiragana[i] + hiragana[i + 1] + hiragana[i + 2] : ''
    let validTypeList: string[] = []
    if (mappingData.has(tri)) {
      validTypeList = mappingData.get(tri) as string[]
      i += 3
      parsedStr.push(tri)
    } else if (mappingData.has(bi)) {
      validTypeList = mappingData.get(bi) as string[]
      i += 2
      parsedStr.push(bi)
    } else if (mappingData.has(uni)) {
      validTypeList = mappingData.get(uni) as string[]
      i++
      parsedStr.push(uni)
    } else {
      throw new Error('不明な文字が検出されました')
    }
    judge.push(validTypeList)
  }
  return { splitSentence: parsedStr, romajiCandidates: judge }
}

const Test = () => {
  const text = ['きゅうきゅうしゃ', 'こんばんは', 'こんにちは']

  const [totalInput, setTotalInput] = useState('')
  const [textIndexShow, setTextIndexShow] = useState(0)
  let inputBuf = ''
  let inputBufNext = ''
  let hiraganaIndex = 0
  let textIndex = 0
  let matchingCandidates: string[] = []
  let romajiCandidates = constructTypeSentence(text[textIndex]).romajiCandidates

  const handleInput = (e: KeyboardEvent) => {
    if (textIndex > text.length - 1) {
      return
    }
    const typedKey = e.key.toLowerCase()
    inputBufNext = inputBuf + typedKey

    //タイプした文字を入れてみて候補があるかを確認
    matchingCandidates = romajiCandidates[hiraganaIndex].filter((romaji) => romaji.startsWith(inputBufNext))
    //候補があるとき（正解の時）
    if (matchingCandidates.length > 0) {
      inputBuf += typedKey
      setTotalInput((prev) => prev + typedKey)
      //ひらがなができたとき
      if (matchingCandidates.length == 1 && matchingCandidates[0] === inputBuf) {
        hiraganaIndex++
        inputBuf = ''
        matchingCandidates = []
        if (hiraganaIndex > romajiCandidates.length - 1) {
          textIndex++
          if (textIndex > text.length - 1) {
            console.log('終了!!!!!')
            return
          }
          setTextIndexShow(textIndex)
          romajiCandidates = constructTypeSentence(text[textIndex]).romajiCandidates
          hiraganaIndex = 0
          setTotalInput('')
        }
      }
    }
    console.log('inputBuf: ' + inputBuf)
    console.log('romajiCandidate[hiraganaIndex]' + romajiCandidates[hiraganaIndex])
    console.log('matchingCandidate: ' + matchingCandidates)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleInput, false)

    return () => {
      document.removeEventListener('keydown', handleInput, false)
    }
  }, [])

  return (
    <div className="h-screen flex justify-center items-center">
      <div>{text[textIndexShow]}</div>
      <div>{totalInput}</div>
    </div>
  )
}

export default Test
