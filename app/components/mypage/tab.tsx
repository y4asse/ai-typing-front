'use client'

import { mypageTabAtom } from '@/recoil/mypageTabAtom'
import { rankingTabAtom } from '@/recoil/rankingTabAtom'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useRecoilState } from 'recoil'

const Tab = () => {
  const [tabNumber, setTabNumber] = useRecoilState(mypageTabAtom)
  const tabs = ['ゲーム履歴', '投稿した投稿']
  const router = useRouter()
  return (
    <div className="flex items-start w-2/3 text-lg font-bold mt-6">
      <button
        onClick={() => {
          router.push('/mypage/gameHistory')
        }}
      >
        ゲーム履歴へ
      </button>
      {tabs.map((string, index) => {
        if (index === tabNumber) {
          return (
            <button
              key={index}
              className="p-3 border-black border-x-4 border-t-4 mr-2 rounded-t-xl bg-black text-white"
            >
              {string}
            </button>
          )
        }
        return (
          <button
            key={index}
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
