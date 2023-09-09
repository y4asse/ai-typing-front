'use client'

import { useMutateGame } from '@/hooks/useMutateGame'
import { defaultState, gameAtom } from '@/recoil/gameAtom'
import { situationAtom } from '@/recoil/situationAtom'
import useTypingLogic from '@/typingLogic/useTypingLogic'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

const GameText = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const [, setSituation] = useRecoilState(situationAtom)
  const { hiragana, text, missTypeKey } = game
  const { textIndex, totalInput, splitSentence, hiraganaIndex, requiredRomaji, isMissFlash, isPlayAgain } =
    useTypingLogic(hiragana)
  // const [romajiShow, setRomajiShow] = useState('')
  const { updateGameScore } = useMutateGame()
  const romajiShow = totalInput + requiredRomaji.join('').substring(totalInput.length)
  // 表示用のromajiを生成
  // useEffect(() => {
  //   setRomajiShow(totalInput + requiredRomaji.join('').substring(totalInput.length))
  // }, [totalInput, requiredRomaji])

  //escapeでもう一度
  const playAgain = () => {
    //テーマ以外をリセット
    setGame((prev) => ({ ...defaultState, thema: prev.thema }))
    setSituation({ value: 'thema' })
  }
  useEffect(() => {
    if (isPlayAgain) {
      playAgain()
    }
  }, [isPlayAgain])

  //終了したときの処理
  useEffect(() => {
    if (textIndex > text.length - 1) {
      //データベースにスコアを送信
      updateGameScore().then((res) => {
        const count = res ? res.count : 0
        const rank = res ? res.rank : 0
        const batches = res ? res.batches : []
        setGame((prev) => {
          return { ...prev, rank, rankingCount: count, batches: batches }
        })
      })
      //終了画面に遷移
      setSituation({ value: 'score' })
      return
    }
  }, [textIndex])
  return (
    <div className=" row-start-2 col-span-4 px-3">
      <div
        className={`px-3 overflow-hidden duration-100 transition-all  ${
          isMissFlash ? ' bg-red-900' : 'bg-black'
        } bg-opacity-70 text-white h-full w-full rounded-2xl grid grid-rows-3`}
      >
        {/* 日本語の表示 */}
        {text[textIndex] && (
          <div className="text-xl text-center mt-10">
            {text[textIndex].split('').map((char, index) => {
              return <span key={index}>{char}</span>
            })}
          </div>
        )}
        {/* ひらがなの表示 */}
        <div className="text-2xl text-center my-auto">
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
        <div className=" whitespace-nowrap text-xl text-center mt-3">
          {romajiShow.split('').map((char, index) => {
            return (
              <span key={index} className={`${index < totalInput.length && 'text-gray-500'}`}>
                {char}
                {index !== 0 && index % 100 === 0 && <br></br>}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GameText
