'use client'

import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { useRecoilState } from 'recoil'
import PlayAgainBtn from '../buttons/playAgainBtn'
import GoRankingBtn from '../buttons/goRankingBtn'
import TweetBtn from '../buttons/tweetBtn'
import CreatedAnimation from '../utils/finishedAnimation'
import ScoreStar from '../utils/scoreStar'

const ScoreView = () => {
  const [game] = useRecoilState(gameAtom)
  const { score, WPM } = game

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <CreatedAnimation />
      </div>
      <div className="text-7xl font-bold animate-bounce">終了!!</div>
      <div className="bg-black bg-opacity-70 text-white py-10 px-24 rounded-2xl text-6xl flex items-center justify-center gap-5">
        <ScoreStar />
        <span>スコア: {score}</span>
      </div>
      <div className="w-2/5 flex gap-5 z-10">
        <PlayAgainBtn />
        <GoRankingBtn />
        {/* RSCではないのでバグる */}
        {/* <AuthBtn /> */}
      </div>
      <div className="w-2/5 flex z-10">
        <TweetBtn />
      </div>
    </div>
  )
}

export default ScoreView
