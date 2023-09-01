'use client'

import { gameAtom } from '@/recoil/gameAtom'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import PlayAgainBtn from '../buttons/playAgainBtn'
import TweetBtn from '../buttons/tweetBtn'
import CreatedAnimation from '../utils/finishedAnimation'
import ScoreStar from '../utils/scoreStar'
import { getAnalyse } from '@/hooks/getAnalyse'
import Spinner from '../utils/spinner'
import PleaseWait from '../utils/pleaseWait'
import { FaRobot } from 'react-icons/fa'
import { GiStairs } from 'react-icons/gi'
import effectAnim from '../../../assets/stars.json'
import { Player } from '@lottiefiles/react-lottie-player'

const ScoreView = () => {
  const [game] = useRecoilState(gameAtom)
  const { score, totalTimeMiliSec, missTypeKey, totalMissTypeNum, totalTypeNum, rank, rankingCount } = game
  const KPM = Math.floor(totalTypeNum / (totalTimeMiliSec / 1000 / 60))
  const accuracy = Math.floor((totalTypeNum * 1000) / (totalTypeNum + totalMissTypeNum)) / 10
  const [isAnalysing, setIsAnalysing] = useState<boolean>(false)
  const [analyseData, setAnalyseData] = useState<string | null>(null)
  const [isShowAnalyse, setIsShowAnalyse] = useState<boolean>(false)
  const [isShowRank, setIsShowRank] = useState<boolean>(false)
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
    <div className="h-screen flex justify-center items-center flex-col gap-2">
      {isShowAnalyse && (
        <div className="absolute bg-orange-100 z-30 w-1/2 border-black border-4 p-10 pb-6 rounded-xl font-bold text-xl">
          {analyseData ? (
            <p>{analyseData}</p>
          ) : (
            <div className="text-center">
              <PleaseWait />
              AI分析中...
            </div>
          )}
          <button
            className="mx-auto border-black border-4 rounded-xl px-3 py-2 mt-5 block hover:bg-black hover:text-white duration-200 transition-all"
            onClick={() => setIsShowAnalyse(false)}
          >
            閉じる
          </button>
        </div>
      )}
      {isShowRank && (
        <div className=" flex flex-col absolute bg-orange-100 z-30 w-1/2 border-black border-4 p-10 pb-6 rounded-xl font-bold text-xl justify-evenly items-center">
          {rank == 0 ? (
            <div className="text-2xl">
              ランキングに反映されませんでした
              <button
                className="z-10 mx-auto border-black border-4 rounded-xl px-10 py-2 mt-5 block hover:bg-black hover:text-white duration-200 transition-all"
                onClick={() => setIsShowRank(false)}
              >
                閉じる
              </button>
            </div>
          ) : (
            <>
              <span>ランキングを更新しました🎉</span>
              <span className="text-5xl my-5 relative">{rank}位</span>
              <span>（{rankingCount}人中）</span>
              <Player
                src={effectAnim}
                autoplay={true}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 "
              />
              <button
                className="z-10 mx-auto border-black border-4 rounded-xl px-10 py-2 mt-5 block hover:bg-black hover:text-white duration-200 transition-all"
                onClick={() => setIsShowRank(false)}
              >
                閉じる
              </button>
            </>
          )}
        </div>
      )}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <CreatedAnimation />
      </div>
      <div className="text-7xl font-bold animate-bounce">終了!!</div>
      <div className="bg-black bg-opacity-70 text-white py-5 px-24 rounded-2xl text-6xl flex items-center justify-center flex-col gap-5">
        <div className="flex justify-center items-center gap-5">
          <ScoreStar />
          <span>スコア: {score}</span>
        </div>
        <div className="flex text-xl justify-evenly w-full">
          <span>入力文字数: {totalTypeNum}</span>
          <span>KPM: {KPM}</span>
          <span>正確率: {accuracy}%</span>
        </div>
        <div className="text-xl">
          <p>間違えた文字: {game.missTypeKey.join(' ').toUpperCase()}</p>
        </div>
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
        <button
          onClick={() => setIsShowRank((prev) => !prev)}
          className=" text-center w-full  border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl  tracking-widest"
        >
          <GiStairs className="inline-block mr-5" />
          順位を表示する
        </button>
      </div>
      <div className="w-1/5 flex z-10">
        <TweetBtn />
      </div>
    </div>
  )
}

export default ScoreView
