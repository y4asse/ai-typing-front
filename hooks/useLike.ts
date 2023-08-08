type Like = {
  likeNum: number
  addLike: () => void
}

export const fetchLikeNum = async (gameId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/likeNum/${gameId}`, {
    cache: 'no-cache'
  })
  if (!res.ok) {
    return 0
  }
  const data = await res.json()
  return data as number
}
