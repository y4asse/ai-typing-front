'use client'

import React, { useEffect, useState } from 'react'

const data = {
  あiu: ['a'],
  い: ['i'],
  う: ['u'],
  え: ['e'],
  お: ['o'],
  か: ['ka'],
  き: ['ki'],
  く: ['ku']
}

const Test = () => {
  const text = 'あいうえお'
  const textChar = text.split("")
  const [input, setInput] = useState([''])

  const handleInput = (e: KeyboardEvent) => {
    if(true){

    }
    setInput((prev) => {
      return [...prev, e.key]
    })
  }

  useEffect(() => {
    document.addEventListener('keydown', handleInput, false)

    return () => {
      document.removeEventListener('keydown', handleInput, false)
    }
  }, [])
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {input}
      <button onClick={() => setInput([])}>リセット</button>
    </div>
  )
}

export default Test
