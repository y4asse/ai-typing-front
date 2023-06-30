import React from 'react'
import LogOutBtn from '../components/buttons/logOutBtn'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import AnimationTitle from '../components/animationTitle/animationTitle'
import GameHistoryList from '../components/mypage/mypageList'
import Tab from '../components/mypage/tab'
import GoBackBtn from '../components/buttons/goBackBtn'

const Mypage = async () => {
  const session = await getServerSession(authOptions)
  return (
    <>
      <GoBackBtn />
      <LogOutBtn />
      <div className="h-screen flex  items-center flex-col pt-10">
        <AnimationTitle text="マイページ" />
        {session?.user.uid}
        <Tab />
      </div>
    </>
  )
}

export default Mypage
