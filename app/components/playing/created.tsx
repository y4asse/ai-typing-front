'use client'

import { useMutateGame } from '@/hooks/useMutateGame'
import { situationAtom } from '@/recoil/situationAtom'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import CreatedAnimation from '../utils/finishedAnimation'

const Created = () => {
  const setSituation = useSetRecoilState(situationAtom)
  const text = '生成が完了しました．ゲームを開始します.'.split('')
  const [timer, setTimer] = useState(3)
  const [typingTimer, setTypingTimer] = useState(0)
  const [isCountNumStart, setIsCountNumStart] = useState(false)
  const { createGame } = useMutateGame()

  useEffect(() => {
    // if (timer < 0) {
    //   setSituation({ value: 'playing' })
    // }
  }, [timer])

  useEffect(() => {
    //サーバにデータを登録.recoilStateにidをセット
    createGame()
  }, [])

  useEffect(() => {
    let c = 0

    const typingCount = setInterval(() => {
      if (c > text.length) {
        clearInterval(typingCount)
        setIsCountNumStart(true)
        return
      }
      setTypingTimer((prev) => prev + 1)
      c++
    }, 50)

    const count = setInterval(() => {
      if (c > text.length) {
        setTimer((prev) => prev - 1)
      }
    }, 1000)

    return () => {
      clearInterval(count)
      clearInterval(typingCount)
    }
  }, [])

  return (
    <>
      <div className="h-screen flex justify-center items-center flex-col gap-5">
        <h3 className="text-4xl font-bold z-10">
          {text.map((word, index) => {
            if (index <= typingTimer) {
              return <span key={index}>{word}</span>
            }
            return ''
          })}
        </h3>
        {isCountNumStart && (
          <h1 className="text-8xl font-bold rotateAnimation z-10">{timer === 0 ? 'スタート!' : timer}</h1>
        )}
      </div>
    </>
  )
}

export default Created
