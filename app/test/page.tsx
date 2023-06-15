'use client'

import { gameAtom } from '@/recoil/gameAtom'
import useTypingLogic from '@/typingLogic/useTypingLogic'
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'


const Test = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const { hiragana } = game
  const { totalInput, textIndexShow } = useTypingLogic(hiragana)

  return (
    <div className="h-screen flex justify-center items-center">
      <div>{hiragana[textIndexShow]}</div>
      <div>{totalInput}</div>
    </div>
  )
}

export default Test
