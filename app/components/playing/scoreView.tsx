'use client'

import { gameAtom } from '@/recoil/gameAtom'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import PlayAgainBtn from '../buttons/playAgainBtn'
import GoRankingBtn from '../buttons/goRankingBtn'
import TweetBtn from '../buttons/tweetBtn'
import CreatedAnimation from '../utils/finishedAnimation'
import ScoreStar from '../utils/scoreStar'
import { getAnalyse } from '@/hooks/getAnalyse'
import Spinner from '../utils/spinner'
import PleaseWait from '../utils/pleaseWait'
import { FaRobot } from 'react-icons/fa'

const ScoreView = () => {
  const [game] = useRecoilState(gameAtom)
  const { score, totalTimeMiliSec, missTypeKey, totalMissTypeNum, totalTypeNum } = game
  const [isAnalysing, setIsAnalysing] = useState<boolean>(false)
  const [analyseData, setAnalyseData] = useState<string | null>(null)
  const [isShowAnalyse, setIsShowAnalyse] = useState<boolean>(false)
  const analyse = () => {
    setIsShowAnalyse(true)
    if (isAnalysing) return
    if (analyseData) return
    setIsAnalysing(true)
    getAnalyse(score, totalTimeMiliSec, totalTypeNum, totalMissTypeNum, missTypeKey).then((res) => {
      if (res === null) {
        alert('AI分析に失敗しました。')
        setIsAnalysing(false)
        setIsShowAnalyse(false)
      }
      setAnalyseData(res)
      setIsAnalysing(false)
    })
  }
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-5">
      {isShowAnalyse && (
        <div className="absolute bg-orange-100 z-30 w-1/2 border-black border-4 p-10 pb-6 rounded-xl font-bold text-xl">
          {analyseData ? <p>{analyseData}</p> : <PleaseWait />}
          <button
            className="mx-auto border-black border-4 rounded-xl px-3 py-2 mt-5 block hover:bg-black hover:text-white duration-200 transition-all"
            onClick={() => setIsShowAnalyse(false)}
          >
            閉じる
          </button>
        </div>
      )}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <CreatedAnimation />
      </div>
      <div className="text-7xl font-bold animate-bounce">終了!!</div>
      <div className="bg-black bg-opacity-70 text-white py-10 px-24 rounded-2xl text-6xl flex items-center justify-center gap-5">
        <ScoreStar />
        <span>スコア: {score}</span>
      </div>
      <button
        className="border-black border-4 z-10 py-8 rounded-xl text-xl font-bold w-2/5 hover:bg-black hover:text-white duration-200 transition-all"
        onClick={analyse}
      >
        {isAnalysing ? (
          <div className="flex justify-center items-center gap-3">
            <Spinner />
            <span>AI分析中...</span>
          </div>
        ) : (
          <span className="flex justify-center items-center">
            <FaRobot className="inline text-2xl mr-5" />
            AI分析
          </span>
        )}
      </button>
      <div className="w-2/5 flex gap-5 z-10">
        <PlayAgainBtn />
        <GoRankingBtn />
        {/* RSCではないのでバグる */}
        {/* <AuthBtn /> */}
      </div>
      <div className="w-1/5 flex z-10">
        <TweetBtn />
      </div>
    </div>
  )
}

export default ScoreView
