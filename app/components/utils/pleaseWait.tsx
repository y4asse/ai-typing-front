import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import anim from '../../../assets/pleaseWait.json'

const PleaseWait = () => {
  return <Player src={anim} className="w-1/3" loop={true} autoplay={true} />
}

export default PleaseWait
