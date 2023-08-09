'use client'

import { hubTabAtom } from '@/recoil/hubTabAtom'
import { Suspense } from 'react'
import { useRecoilState } from 'recoil'
import Loader from '../loader/rankingLoader'
import LatestGamesList from './latestGamesList'
import GameListByLike from './gameListByLike'

const HubList = () => {
  const [tabNumber] = useRecoilState(hubTabAtom)
  return (
    <div className="border-black border-4 rounded-b-xl p-5 w-2/3 h-3/5 text-2xl">
      {tabNumber === 0 ? (
        <LatestGamesList />
      ) : tabNumber === 1 ? (
        <GameListByLike />
      ) : (
        <div className="flex justify-center items-center h-full text-5xl font-bold">準備中</div>
      )}
    </div>
  )
}

export default HubList
