'use client'

import { useRecoilState } from 'recoil'
import { rankingTabAtom } from '@/recoil/rankingTabAtom'
import ScoreRankingList from './scoreRankingList'
import { Suspense } from 'react'
import RankingLoader from '../loader/rankingLoader'

const RankingList = () => {
  const [tabNumber] = useRecoilState(rankingTabAtom)
  return (
    <div className="border-black border-4 rounded-b-xl p-5 w-2/3 h-2/3 text-2xl">
      {tabNumber === 0 ? (
        <Suspense fallback={<RankingLoader />}>
          <ScoreRankingList />
        </Suspense>
      ) : (
        <div className="flex justify-center items-center h-full text-5xl font-bold">準備中</div>
      )}
    </div>
  )
}

export default RankingList
