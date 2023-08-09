import { LikeCountWithGame } from '@/app/components/hub/gameListByLike'

export const GetGamesByLike = async (offset: number, limit: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/likeCountRanking?offset=${offset}&limit=${limit}`)
  if (!res.ok) {
    console.log(res.statusText)
    return null
  }
  const data: LikeCountWithGame[] = await res.json()
  return data
}
