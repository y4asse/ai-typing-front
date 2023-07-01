import GoBackBtn from '@/app/components/buttons/goBackBtn'
import RankingLoader from '@/app/components/loader/rankingLoader'
import GameHistoryList from '@/app/components/mypage/gameHistoryList'
import React, { Suspense } from 'react'

const GameHistory = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-black border-4 rounded-xl p-5 w-2/3 h-2/3 text-2xl">
        <Suspense fallback={<RankingLoader />}>
          <GameHistoryList />
        </Suspense>
      </div>
    </div>
  )
}

export default GameHistory
