'use client'

import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

const GameTimer = () => {
  const [game] = useRecoilState(gameAtom)
  return <div>{game.timer}</div>
}

export default GameTimer
