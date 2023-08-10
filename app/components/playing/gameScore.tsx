'use client'

import { gameAtom } from '@/recoil/gameAtom'
import { useRecoilState } from 'recoil'
import EffectAnimation from '../utils/effect'
import { useEffect, useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'

const GameScore = () => {
  const [game] = useRecoilState(gameAtom)
  const { score } = game
  const playerRef = useRef<Player>(null)
  useEffect(() => {
    playerRef.current && playerRef.current.stop()
    playerRef.current && playerRef.current.play()
  }, [score])
  return (
    <div className="flex justify-center items-center text-6xl relative">
      スコア:
      <span>
        {score}
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 opacity-80">
          <EffectAnimation playerRef={playerRef} />
        </div>
      </span>
    </div>
  )
}

export default GameScore
