'use client'

import { gameAtom } from '@/recoil/gameAtom'
import { useEffect, useRef } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

const ThemaInput = () => {
  const [game] = useRecoilState(gameAtom)
  const setGame = useSetRecoilState(gameAtom)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <input
      ref={inputRef}
      required
      className="bg-transparent border-4 border-black rounded-xl text-4xl font-medium p-3 placeholder:opacity-30 w-full"
      placeholder="例:アニメの名言"
      value={game.thema}
      type="text"
      onChange={(e) =>
        setGame((state) => {
          return { ...state, thema: e.target.value }
        })
      }
    />
  )
}

export default ThemaInput
