import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import effectAnim from '../../../assets/stars.json'

const EffectAnimation = ({ playerRef }: { playerRef: React.RefObject<Player> }) => {
  const effect = effectAnim
  return <Player ref={playerRef} src={effect} />
}

export default EffectAnimation
