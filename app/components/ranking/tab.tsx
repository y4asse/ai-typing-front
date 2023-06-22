'use client'

import { rankingTabAtom } from '@/recoil/rankingTabAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

const Tab = () => {
  const [tabNumber, setTabNumber] = useRecoilState(rankingTabAtom)
  const tabs = ['スコアランキング', 'レベルランキング']
  return (
    <div className="flex items-start w-2/3 text-lg font-bold mt-6">
      {tabs.map((string, index) => {
        if (index === tabNumber) {
          return (
            <button className="p-3 border-black border-x-4 border-t-4 mr-2 rounded-t-xl bg-black text-white">
              {string}
            </button>
          )
        }
        return (
          <button
            className="p-3 border-black border-x-4 border-t-4 mr-2 rounded-t-xl"
            onClick={() => setTabNumber(index)}
          >
            {string}
          </button>
        )
      })}
    </div>
  )
}

export default Tab
