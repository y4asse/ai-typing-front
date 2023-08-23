import TextDetail from '@/app/components/hub/textDetail'
import { FavoriteIconAnim } from '@/app/components/utils/likeBtn'
import { fetchLikeNum } from '@/hooks/useLike'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
  const gameId = params.id
  const likeNum = await fetchLikeNum(gameId)

  return (
    <div className="h-screen flex-col flex justify-center items-center text-2xl gap-2 ">
      <div className="border-black border-4 p-10 w-2/3 rounded-xl relative">
        <TextDetail gameId={gameId} />
      </div>
      <div className=" flex justify-center items-center">
        <FavoriteIconAnim gameId={gameId} likeNum={likeNum} />
      </div>
    </div>
  )
}

export default Page
