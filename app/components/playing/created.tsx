'use client'

import { useMutateGame } from '@/hooks/useMutateGame'
import { situationAtom } from '@/recoil/situationAtom'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

const Created = () => {
  const setSituation = useSetRecoilState(situationAtom)
  const text = '生成が完了しました．/スペースかエンターを押してゲームを開始します'.split('')
  const [typingTimer, setTypingTimer] = useState(0)
  const [isCountNumStart, setIsCountNumStart] = useState(false)
  const { createGame } = useMutateGame()

  const handleInput = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    setSituation({ value: 'playing' })
  }

  useEffect(() => {
    document.addEventListener('keydown', handleInput, false)
    return () => {
      document.removeEventListener('keydown', handleInput, false)
    }
  }, [handleInput])

  useEffect(() => {
    //サーバにデータを登録とrecoilStateにidをセット
    createGame()
  }, [])

  //タイピングテキスト用
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

    return () => {
      clearInterval(typingCount)
    }
  }, [])

  return (
    <>
      <div className="h-screen flex justify-center items-center flex-col gap-5">
        <h3 className="text-4xl font-bold z-10 text-center">
          {text.map((word, index) => {
            if (index <= typingTimer) {
              if (word === '/') return <br key={index} />
              return <span key={index}>{word}</span>
            }
          })}
        </h3>
        <p className="mt-5 text-gray-600 text-3xl animate-pulse">Press enter or space</p>
      </div>
    </>
  )
}

export default Created
