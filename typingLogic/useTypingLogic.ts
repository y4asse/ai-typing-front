'use client'

import { useEffect, useState } from 'react'
import { constructTypeSentence } from './constructTypeSentence'

const useTypingLogic = (text: string[]): { textIndexShow: number; totalInput: string } => {
  if (text.length < 1) {
    throw new Error('テキストが存在しません')
  }
  const [totalInput, setTotalInput] = useState('')
  const [textIndexShow, setTextIndexShow] = useState(0)
  let inputBuf = ''
  let inputBufNext = ''
  let hiraganaIndex = 0
  let textIndex = 0
  let matchingCandidates: string[] = []
  let romajiCandidates = constructTypeSentence(text[textIndex]).romajiCandidates
  if (romajiCandidates.length < 1) {
  }

  const handleInput = (e: KeyboardEvent) => {
    //終了後
    if (textIndex > text.length - 1) {
      return
    }
    //テキストがないときerror
    if (text.length < 1) {
      console.log('テキストがありません')
      return
    }
    const typedKey = e.key
    if (typedKey == 'Shift') {
      return
    }
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
  }

  useEffect(() => {
    document.addEventListener('keydown', handleInput, false)

    return () => {
      document.removeEventListener('keydown', handleInput, false)
    }
  }, [])

  return { textIndexShow, totalInput }
}
export default useTypingLogic
