import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import effectAnim from '../../../assets/effect.json'

const EffectAnimation = ({ playerRef, className = '' }: { playerRef: React.RefObject<Player>; className?: string }) => {
  const effect = effectAnim
  return (
    <div className={className}>
      <Player ref={playerRef} speed={1.8} keepLastFrame src={effect} />
    </div>
  )
}

export default EffectAnimation
