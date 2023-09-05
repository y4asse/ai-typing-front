import React from 'react'
import LogOutBtn from '../components/buttons/logOutBtn'
import GameHistoryList from '../components/mypage/gameHistoryList'
import Profile from '../components/mypage/profile'
import Batch from '../components/mypage/batch'
import PlayData from '../components/mypage/playData'
import { Game } from '@/types/game'
import { User } from '@/types/profile'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getFreshIdToken } from '@/hooks/getFreshIdToken'

const getPlayData = async () => {
  const session = await getServerSession(authOptions)
  if (session == null) {
    return null
  }
  const refreshToken = session.user.refreshToken
  const freshIdToken = await getFreshIdToken(refreshToken)
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/games`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${freshIdToken}`
    },
    cache: 'no-cache'
  }).then((res) => {
    if (!res.ok) {
      console.log(res.statusText)
      return null
    }
    return res.json()
  })
  return (data as Game[]) || null
}

const getProfile = async () => {
  const session = await getServerSession(authOptions)
  if (session == null) {
    return null
  }
  const refreshToken = session.user.refreshToken
  const freshIdToken = await getFreshIdToken(refreshToken)
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${freshIdToken}`
    },
    cache: 'no-cache'
  }).then((res) => {
    return res.json()
  })
  return data as User
}

const Mypage = async () => {
  const user = await getProfile()
  const games = await getPlayData()
  const defaultUser: User = {
    name: '',
    image: '',
    user_id: ''
  }
  return (
    <div className="pt-[90px]">
      <div className="grid grid-cols-4 pb-36">
        {/* 左側 */}
        <div className="flex flex-col items-center gap-5 border-r border-gray-400">
          <Profile user={user == null ? defaultUser : user} />
          <LogOutBtn />
        </div>

        {/* 右側 */}
        <div className=" col-span-3">
          <div className="w-[900px] mx-auto">
            <h1 className="text-3xl font-bold mb-7">バッジ</h1>
            <p className="mb-5 text-lg">ゲームをプレイするとスコアに応じてバッジが獲得できます</p>
            <Batch />
            <h1 className="text-3xl font-bold mb-7">これまでの成績</h1>
            <PlayData games={games} />
            <p className="mt-2 mb-10 text-end">※スコアが0の場合は成績に反映されません</p>
            <h1 className="text-3xl font-bold mb-7">直近のゲーム履歴</h1>
            <GameHistoryList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypage
