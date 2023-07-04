'use client'

import { hubTabAtom } from '@/recoil/hubTabAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

const Tab = () => {
  const [tabNumber, setTabNumber] = useRecoilState(hubTabAtom)
  const tabs = ['新着順', 'いいね順']
  return (
    <div className="flex items-start w-2/3 text-lg w- font-bold mt-6 whitespace-nowrap">
      {tabs.map((string, index) => {
        if (index === tabNumber) {
          return (
            <button
              key={index}
              className="w-1/6 p-3 border-black border-x-4 border-t-4 mr-2 rounded-t-xl bg-black text-white"
            >
              {string}
            </button>
          )
        }
        return (
          <button
            key={index}
            className="w-1/6 p-3 border-black border-x-4 border-t-4 mr-2 rounded-t-xl"
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
