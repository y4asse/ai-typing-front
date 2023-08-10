import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import effectAnim from '../../../assets/loading.json'

const LoadingAnimation = () => {
  return <Player src={effectAnim} autoplay loop className="h-screen" />
}

export default LoadingAnimation
