'use client'

import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { useRecoilState } from 'recoil'
import GoHomeBtn from '../buttons/goHomeBtn'
import PlayAgainBtn from '../buttons/playAgainBtn'
import GoRankingBtn from '../buttons/goRankingBtn'
import AuthBtn from '../buttons/authBtn'
import TweetBtn from '../buttons/tweetBtn'

const ScoreView = () => {
  const [game] = useRecoilState(gameAtom)
  const { score } = game
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-10">
      <div className="text-7xl font-bold animate-bounce">終了!!</div>
      <div className="bg-black bg-opacity-70 text-white py-10 px-24 rounded-2xl text-6xl">スコア: {score}</div>
      <div className="w-2/5 flex gap-5">
        <PlayAgainBtn />
        <GoRankingBtn />
        {/* RSCではないのでバグる */}
        {/* <AuthBtn /> */}
      </div>
      <div className="w-2/5 flex">
        <TweetBtn />
      </div>
    </div>
  )
}

export default ScoreView
