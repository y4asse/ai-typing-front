import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import effectAnim from '../../../assets/finish.json'

const FinishedAnimation = () => {
  return <Player src={effectAnim} autoplay className="h-screen" />
}

export default FinishedAnimation
