import { Game } from '@/types/game'
import { calcKpm } from '@/typingLogic/calcScore'
import React from 'react'

const calcScore = (games: Game[]) => {
  let totalScore = 0
  let maxScore = 0
  let totalKpm = 0
  let maxKpm = 0
  let gameCount = 0
  games.map((game) => {
    if (game.score <= 0) return
    const kpm = calcKpm(game.total_key_count, game.total_time)
    totalScore += game.score
    totalKpm += kpm
    gameCount++
    if (game.score > maxScore) {
      maxScore = game.score
    }
    if (kpm > maxKpm) {
      maxKpm = kpm
    }
  })

  const avgScore = gameCount != 0 ? Math.floor(totalScore / gameCount) : 0
  const avgKpm = gameCount != 0 ? Math.floor((totalKpm / gameCount) * 10) / 10 : 0
  return {
    totalScore,
    maxScore,
    avgScore,
    maxKpm,
    avgKpm,
    gameCount
  }
}

const PlayData = ({ games }: { games: Game[] | null }) => {
  if (games == null) {
    return (
      <div className="bg-black opacity-70 text-white mx-auto rounded-xl p-5 grid grid-cols-3 mb-10">
        <div className="rounded-full border border-white w-[200px] h-[200px] mx-auto my-5 flex flex-col justify-center items-center text-3xl shadow-md shadow-white ">
          <p>スコア</p>
          <p>最高: 0</p>
          <p>平均: 0</p>
        </div>
        <div className="rounded-full border border-white w-[200px] h-[200px] mx-auto my-5 flex flex-col justify-center items-center text-3xl shadow-md shadow-white ">
          <p>プレイ回数</p>
          <p>0 回</p>
        </div>
        <div className="rounded-full border border-white w-[200px] h-[200px] mx-auto my-5 flex flex-col justify-center items-center text-3xl shadow-md shadow-white ">
          <p>KPM</p>
          <p>最高: 0</p>
          <p>平均: 0</p>
        </div>
      </div>
    )
  }
  const { totalScore, maxScore, avgScore, maxKpm, avgKpm, gameCount } = calcScore(games)
  return (
    <div className="bg-black opacity-70 text-white mx-auto rounded-xl p-5 grid grid-cols-3">
      <div className="rounded-full border border-white w-[200px] h-[200px] mx-auto my-5 flex flex-col justify-center items-center text-3xl shadow-md shadow-white whitespace-nowrap">
        <p>スコア</p>
        <p>最高: {maxScore}</p>
        <p>平均: {avgScore}</p>
      </div>
      <div className="rounded-full border border-white w-[200px] h-[200px] mx-auto my-5 flex flex-col justify-center items-center text-3xl shadow-md shadow-white ">
        <p>プレイ回数</p>
        <p>{gameCount} 回</p>
      </div>
      <div className="rounded-full border border-white w-[200px] h-[200px] mx-auto my-5 flex flex-col justify-center items-center text-3xl shadow-md shadow-white ">
        <p>KPM</p>
        <p>最高: {maxKpm}</p>
        <p>平均: {avgKpm}</p>
      </div>
    </div>
  )
}

export default PlayData
