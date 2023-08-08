import { fetchLikeNum } from '@/hooks/useLike'
import React from 'react'

const LikeNum = async ({ gameId }: { gameId: string }) => {
  const likeNum = await fetchLikeNum(gameId)
  return <>{likeNum}</>
}

export default LikeNum
