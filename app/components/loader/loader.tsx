'use client'

import React, { useEffect, useState } from 'react'

const Loader = () => {
  const textArray = 'AIがテキストを生成中です...'.split('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev > textArray.length) {
          return 0
        }
        return prev + 1
      })
    }, 200)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="font-bold text-5xl">
        {textArray.map((word, index) => {
          if (index <= count) {
            return <span key={index}>{word}</span>
          }
          return ''
        })}
      </h1>
    </div>
  )
}

export default Loader
