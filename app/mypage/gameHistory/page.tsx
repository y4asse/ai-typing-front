import GameHistoryList from '@/app/components/mypage/gameHistoryList'
import Spinner from '@/app/components/utils/spinner'
import React, { Suspense } from 'react'

const GameHistory = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-black border-4 rounded-xl p-5 w-2/3 h-2/3 text-2xl">
        <Suspense fallback={<Spinner/>}>
          <GameHistoryList />
        </Suspense>
      </div>
    </div>
  )
}

export default GameHistory
