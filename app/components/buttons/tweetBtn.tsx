'use client'

import { batchList } from '@/data/batches'
import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import { useRecoilState } from 'recoil'

const TweetBtn = () => {
  const [game] = useRecoilState(gameAtom)
  const { score, thema, totalMissTypeNum, totalTimeMiliSec, totalTypeNum, rank, batches } = game
  const KPM = Math.floor(totalTypeNum / (totalTimeMiliSec / 1000 / 60))
  const time = Math.floor((totalTypeNum * 1000) / (totalTypeNum + totalMissTypeNum)) / 10
  let batchNames: string[] = []
  batches.map((newBatch) => {
    batchList.map((batch) => {
      if (newBatch.name == batch.id) {
        batchNames.push('「' + batch.name + '」')
      }
    })
  })
  console.log(batchNames)
  const text = encodeURIComponent(
    `AI Typingをプレイしました！🚀\nテーマ🔥「${thema}」\nスコア📃「${score}」点\nKPM「${KPM}」\n入力時間⌛「${
      Math.floor(totalTimeMiliSec / 100) / 10
    }」秒\n正確率「${time}」%\n${rank != 0 ? 'ランキングを更新🎉「' + rank + '位」\n' : ''}${
      batches.length > 0 ? `バッチを獲得しました🏅${batchNames}\n` : ''
    }\n`
  )
  const hashtags = encodeURIComponent('AItyping')
  const url = encodeURIComponent('https://ai-typing.app\n')
  return (
    <a
      className=" text-center w-[400px] border-gray-500 border rounded-full py-5 hover:bg-blue-400 hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl hover:scale-95  tracking-widest"
      href={`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      シェアする
      <FaTwitter className="inline-block ml-5 " />
    </a>
  )
}

export default TweetBtn
