import React from 'react'
import LogOutBtn from '../components/buttons/logOutBtn'
import GameHistoryList from '../components/mypage/gameHistoryList'
import Profile from '../components/mypage/profile'
import Batch from '../components/mypage/batch'
import PlayData from '../components/mypage/playData'
import { Game } from '@/types/game'
import { User } from '@/types/profile'

const getPlayData = async () => {
  const data = await fetch('https://12b0ec6f-a2e8-4081-afaf-b7b1de217aae.mock.pstmn.io/game', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'force-cache'
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
  const data = await fetch('https://6eceb7b0-ca73-4a13-9a2c-1c2e6020512f.mock.pstmn.io/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'force-cache'
  }).then((res) => {
    return res.json()
  })
  return data as User
}

const Mypage = async () => {
  const user = await getProfile()
  const games = await getPlayData()
  return (
    <div className="pt-[90px]">
      <div className="grid grid-cols-4 pb-36">
        {/* 左側 */}
        <div className="flex flex-col items-center gap-5 border-r border-gray-400">
          <Profile user={user} />
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
            <h1 className="text-3xl font-bold mb-7">直近のゲーム履歴</h1>
            <GameHistoryList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypage
