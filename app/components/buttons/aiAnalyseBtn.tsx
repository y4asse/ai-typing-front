'use client'

import React, { useState } from 'react'
import { FaRobot } from 'react-icons/fa'
import Spinner from '../utils/spinner'
import { getAnalyse } from '@/hooks/getAnalyse'
import { useRecoilState } from 'recoil'
import { gameAtom } from '@/recoil/gameAtom'

type Props = {
  isShowAnalyse: boolean
  setIsShowAnalyse: React.Dispatch<React.SetStateAction<boolean>>
  analyseData: string | null
  setAnalyseData: React.Dispatch<React.SetStateAction<string | null>>
}

const AiAnalyseBtn = ({ isShowAnalyse, setIsShowAnalyse, analyseData, setAnalyseData }: Props) => {
  const [isAnalysing, setIsAnalysing] = useState<boolean>(false)
  const [game] = useRecoilState(gameAtom)
  const { score, totalTimeMiliSec, missTypeKey, totalMissTypeNum, totalTypeNum, rank, rankingCount } = game
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
    <button
      className="border-black border-4 z-10 py-8 rounded-xl text-xl font-bold w-2/5 hover:bg-black hover:text-white duration-200 transition-all hover:scale-95"
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
  )
}

export default AiAnalyseBtn
