'use client'

import { mypageTabAtom } from '@/recoil/mypageTabAtom'
import React, { Suspense } from 'react'
import { useRecoilState } from 'recoil'
import Spinner from '../utils/spinner'
import GameHistoryList from './gameHistoryList'

const MypageList = () => {
  const [tabNumber] = useRecoilState(mypageTabAtom)
  return (
    <div className="border-black border-4 rounded-b-xl p-5 w-2/3 h-2/3 text-2xl">
      {tabNumber === 0 ? (
        <Suspense fallback={<Spinner />}>
          <GameHistoryList />
        </Suspense>
      ) : (
        <div className="flex justify-center items-center h-full text-5xl font-bold">準備中</div>
      )}
    </div>
  )
}

export default MypageList
