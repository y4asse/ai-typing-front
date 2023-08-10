'use client'

import { Player } from '@lottiefiles/react-lottie-player'
import { useEffect, useRef, useState } from 'react'
import like from '../../../assets/like.json'
import { fetchLikeNum } from '@/hooks/useLike'

export const FavoriteIconAnim = ({ gameId, likeNum }: { gameId: string; likeNum: number }) => {
  const playerRef = useRef<Player>(null)
  const [num, setNum] = useState(likeNum)

  useEffect(() => {
    fetchLikeNum(gameId).then((res) => {
      setNum(res)
    })
  }, [])

  const handleClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ game_id: gameId })
    }).then(() => {
      fetchLikeNum(gameId).then((res) => {
        setNum(res)
      })
    })

    playerRef.current && playerRef.current.stop()
    playerRef.current && playerRef.current.play()
  }

  return (
    <>
      <button onClick={handleClick} className="w-20">
        <Player ref={playerRef} speed={1.8} keepLastFrame src={like} />
      </button>
      <span className="pr-3">{num}</span>
    </>
  )
}
