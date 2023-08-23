'use client'

import { gameAtom } from '@/recoil/gameAtom'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const ThemaInput = () => {
  const [game] = useRecoilState(gameAtom)
  const setGame = useSetRecoilState(gameAtom)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showToggle, setShowToggle] = useState(false)
  const { thema, detail } = game
  const dropDownList = ['についての文章', 'を連打する文章', '文章']

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      {thema.length > 10 && <p className="text-red-500">※テーマは10文字以内で入力してください</p>}
      {detail !== 'についての文章' && <p className="text-red-500">※この設定はランキングに追加されません</p>}
      <input
        ref={inputRef}
        required
        className="bg-transparent border-4 border-black rounded-xl text-4xl font-medium p-3 placeholder:opacity-30 w-full"
        placeholder={`${
          detail === 'についての文章'
            ? '例:アニメの名言'
            : detail === 'を連打する文章'
            ? '例:無駄無駄'
            : '例:意味が分かると怖い'
        }`}
        value={thema}
        type="text"
        onChange={(e) =>
          setGame((state) => {
            return { ...state, thema: e.target.value }
          })
        }
      />
      <div className="text-end text-xl font-semibold  relative">
        <span
          className="cursor-pointer"
          onClick={() => {
            setShowToggle(!showToggle)
          }}
        >
          {detail}
          {showToggle ? <FaAngleUp className="inline-block" /> : <FaAngleDown className="inline-block" />}
        </span>
        {showToggle && (
          <div className="flex flex-col absolute top-1/2 left-full text-start border-2 border-black p-3 rounded-xl -translate-y-1/2">
            {dropDownList.map((value, i) => (
              <span
                key={i}
                onClick={() => {
                  setShowToggle(false)
                  if (value !== 'についての文章') {
                    setGame((prev) => ({ ...prev, detail: value, disableRanking: true }))
                  } else {
                    setGame((prev) => ({ ...prev, detail: value, disableRanking: false }))
                  }
                }}
                className=" whitespace-nowrap cursor-pointer"
              >
                {value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ThemaInput
