import { useRef } from 'react'
import Loader from '../loader/loader'
import { Player } from '@lottiefiles/react-lottie-player'
import LoadingAnimation from '../utils/loadingAnimation'

const CreatingText = () => {
  const playerRef = useRef<Player>(null)

  return (
    <div className="h-screen text-center">
      <Loader />
      <div className="absolute top-0  opacity-50 left-1/2 -translate-x-1/2 ">
        <LoadingAnimation />
      </div>
    </div>
  )
}

export default CreatingText
