import React, { Suspense } from 'react'
import LogOutBtn from '../components/buttons/logOutBtn'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import AnimationTitle from '../components/animationTitle/animationTitle'
import GoBackBtn from '../components/buttons/goBackBtn'
import Spinner from '../components/utils/spinner'
import GameHistoryList from '../components/mypage/gameHistoryList'

const Mypage = async () => {
  const session = await getServerSession(authOptions)
  return (
    <>
      <GoBackBtn />
      <LogOutBtn />
      <div className="h-screen flex  items-center justify-center gap-10 flex-col">
        <AnimationTitle text="マイページ(ゲーム履歴)" />
        <div className="border-black border-4 rounded-xl p-5 w-2/3 h-2/3 text-2xl">
          <Suspense fallback={<Spinner />}>
            <GameHistoryList />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Mypage
