import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import starAnimation from '../../../assets/start.json'

const ScoreStar = () => {
  return <Player speed={1} src={starAnimation} className="h-16" loop={true} autoplay={true} />
}

export default ScoreStar
