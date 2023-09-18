'use client'

import { gameAtom } from '@/recoil/gameAtom'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import PlayAgainBtn from '../buttons/playAgainBtn'
import TweetBtn from '../buttons/tweetBtn'
import CreatedAnimation from '../utils/finishedAnimation'
import ScoreStar from '../utils/scoreStar'
import PleaseWait from '../utils/pleaseWait'
import effectAnim from '../../../assets/stars.json'
import { Player } from '@lottiefiles/react-lottie-player'
import AiAnalyseBtn from '../buttons/aiAnalyseBtn'
import ShowRank from '../buttons/showRankBtn'
import { batchList } from '@/data/batches'
import Image from 'next/image'

const ScoreView = () => {
  const [game] = useRecoilState(gameAtom)
  const { score, totalTimeMiliSec, missTypeKey, totalMissTypeNum, totalTypeNum, rank, rankingCount, batches } = game
  const KPM = Math.floor(totalTypeNum / (totalTimeMiliSec / 1000 / 60))
  const accuracy = Math.floor((totalTypeNum * 1000) / (totalTypeNum + totalMissTypeNum)) / 10
  const [analyseData, setAnalyseData] = useState<string | null>(null)
  const [isShowAnalyse, setIsShowAnalyse] = useState<boolean>(false)
  const [isShowRank, setIsShowRank] = useState<boolean>(false)
  const [isShowBatch, setIsShowBatch] = useState<boolean>(true)
  const missTypeKeySet = new Set(missTypeKey.map((value) => value.wanted_key))
  const joinMissTypeKey = Array.from(missTypeKeySet).join(' ').toUpperCase()
  return (
    <div className="h-screen grid grid-cols-4 grid-rows-2 py-20">
      {isShowAnalyse && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-100 z-30 w-800 border-black border-4 p-10 pb-6 rounded-xl font-bold text-xl">
          {analyseData ? (
            <p>{analyseData}</p>
          ) : (
            <div className="text-center">
              <PleaseWait />
              AI分析中...
            </div>
          )}
          <button
            className="mx-auto border-gray-800 border rounded-xl px-3 py-2 mt-5 block hover:bg-black hover:text-white duration-200 transition-all"
            onClick={() => setIsShowAnalyse(false)}
          >
            閉じる
          </button>
        </div>
      )}
      {isShowBatch && batches && batches.length > 0 && (
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-primary border-4 border-black rounded-xl z-50 p-10 gap-10">
          <h1 className="text-2xl font-bold">新しいバッジを獲得しました🎉</h1>
          <div className="flex justify-evenly w-full">
            {batchList.map((batch, index) => {
              return (
                <>
                  {batches.find((newBatch) => batch.id == newBatch.name) && (
                    <div className="px-4 my-auto mt-5 w-[200px] " key={index}>
                      <div className="flex flex-col items-center justify-evenly shadow-xl rounded-3xl p-1 ">
                        <h2 className="text-xl font-bold">{batch.name}</h2>
                        <Image alt={batch.alt} src={batch.image} className="px-5" width={150} height={150} />
                        <p className=" text-gray-500">{batch.description}</p>
                        <span className="rounded-lg px-1 bg-black bg-opacity-50 text-white">{batch.border}～</span>
                      </div>
                    </div>
                  )}
                </>
              )
            })}
          </div>
          <button
            onClick={() => setIsShowBatch(false)}
            className=" px-5 py-3 rounded-lg text-xl font-bold shadow-btn bg-btn hover:shadow-btnHover hover:bg-btnHover w-[100px]"
          >
            閉じる
          </button>
        </div>
      )}
      {isShowRank && (
        <div className=" flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-100 z-30 w-1/2 border-black border-4 p-10 pb-6 rounded-xl font-bold text-xl justify-evenly items-center">
          {rank == 0 ? (
            <div className="text-2xl">
              ランキングに反映されませんでした
              <button
                className="z-10 mx-auto border-gray-800 border rounded-xl px-3 py-2 mt-5 block hover:bg-black hover:text-white duration-200 transition-all"
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
                className="z-10 mx-auto border-gray-800 border rounded-xl px-3 py-2 mt-5 block hover:bg-black hover:text-white duration-200 transition-all"
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

      <div className=" col-span-2 col-start-2 text-center">
        <h1 className="text-7xl font-bold animate-bounce">終了!!</h1>
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
            <p>間違えた文字: {joinMissTypeKey}</p>
          </div>
        </div>
      </div>
      <div className=" col-span-4 row-start-2 z-10 flex flex-col justify-evenly items-center">
        <div className="flex justify-evenly items-center gap-3">
          <AiAnalyseBtn
            isShowAnalyse={isShowAnalyse}
            setIsShowAnalyse={setIsShowAnalyse}
            analyseData={analyseData}
            setAnalyseData={setAnalyseData}
          />
          <PlayAgainBtn />
          <ShowRank setIsShowRank={setIsShowRank} />
        </div>
        <TweetBtn />
      </div>
    </div>
  )
}

export default ScoreView
