'use client'

import { situationAtom } from '@/recoil/situationAtom'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

const Created = () => {
  const setSituation = useSetRecoilState(situationAtom)
  const text = '生成が完了しました．ゲームを開始します.'.split('')
  const [timer, setTimer] = useState(3)
  const [typingTimer, setTypingTimer] = useState(0)
  const [isCountNumStart, setIsCountNumStart] = useState(false)

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
        setTimer((prev) => {
          if (prev < 1) {
            setSituation({ value: 'playing' })
            return prev
          }
          return prev - 1
        })
      }
    }, 1000)

    return () => {
      clearInterval(count)
      clearInterval(typingCount)
    }
  }, [])

  return (
    <>
      <div className="container">
        <div className="completeText">
          <h3>
            {text.map((word, index) => {
              if (index <= typingTimer) {
                return <span key={index}>{word}</span>
              }
              return ''
            })}
          </h3>
          {isCountNumStart && (
            <div>
              <span>{timer === 0 ? 'スタート!' : timer}</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Created
