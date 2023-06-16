'use client'

import { gameAtom } from '@/recoil/gameAtom'
import { situationAtom } from '@/recoil/situationAtom'
import useTypingLogic from '@/typingLogic/useTypingLogic'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

const GameText = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const [, setSituation] = useRecoilState(situationAtom)
  const { hiragana, text } = game
  const { textIndex, totalInput, splitSentence, hiraganaIndex } = useTypingLogic(hiragana)
  useEffect(() => {
    if (textIndex > text.length - 1) {
      setSituation({ value: 'score' })
      return
    }
  }, [textIndex])
  return (
    <div className="relative">
      <div className="absolute gap-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white h-full  min-w-full max-w-screen-xl p-6 rounded-2xl flex flex-col justify-center items-center">
        {text[textIndex] && (
          <div>
            <div className="text-2xl whitespace-nowrap">{text[textIndex].slice(0, 50)}</div>
            <div className="text-2xl whitespace-nowrap">{text[textIndex].substring(50)}</div>
          </div>
        )}

        <div className="text-xl">
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
        {totalInput ? (
          <div>
            <p>{totalInput.slice(0, 120)}</p>
            <p>{totalInput.substring(120)}</p>
          </div>
        ) : (
          <br></br>
        )}
      </div>
    </div>
  )
}

export default GameText
