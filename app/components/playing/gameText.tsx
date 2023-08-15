'use client'

import { useMutateGame } from '@/hooks/useMutateGame'
import { gameAtom } from '@/recoil/gameAtom'
import { situationAtom } from '@/recoil/situationAtom'
import useTypingLogic from '@/typingLogic/useTypingLogic'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

const GameText = () => {
  const [game] = useRecoilState(gameAtom)
  const [, setSituation] = useRecoilState(situationAtom)
  const { hiragana, text, totalMissTypeNum, totalTypeNum, totalTimeMiliSec } = game
  const { textIndex, totalInput, splitSentence, hiraganaIndex, requiredRomaji } = useTypingLogic(hiragana)
  const [romajiShow, setRomajiShow] = useState('')
  const { updateGameScore } = useMutateGame()

  //表示用のromajiを生成
  useEffect(() => {
    setRomajiShow(totalInput + requiredRomaji.join('').substring(totalInput.length))
  }, [totalInput, requiredRomaji])

  //終了したときの処理
  useEffect(() => {
    if (textIndex > text.length - 1) {
      //データベースにスコアを送信
      updateGameScore()
      //終了画面に遷移
      setSituation({ value: 'score' })
      return
    }
  }, [textIndex])
  return (
    <div className=" row-start-2 col-span-4 px-3">
      <div className=" px-3 overflow-hidden  bg-black bg-opacity-70 text-white h-full w-full rounded-2xl flex flex-col justify-evenly items-center">
        {/* 日本語の表示 */}
        {text[textIndex] && (
          <div>
            <div className="text-xl">
              {text[textIndex].split('').map((char, index) => {
                return <span key={index}>{char}</span>
              })}
            </div>
          </div>
        )}
        {/* ひらがなの表示 */}
        <div className="text-2xl">
          {splitSentence.map((char, index) => {
            if (index < hiraganaIndex) {
              return (
                <span key={index} className="text-gray-500">
                  {char}
                </span>
              )
            }
            return <span key={index}>{char}</span>
          })}
        </div>
        {/* ローマ字の表示 */}
        <div className=" text-2xl flex whitespace-nowrap w-full">
          <div className="text-gray-500 w-1/2 flex justify-end">{totalInput}</div>
          <div className="w-1/4">{requiredRomaji.join('').substring(totalInput.length)}</div>
        </div>
      </div>
    </div>
  )
}

export default GameText
