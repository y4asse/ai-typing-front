'use client'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import React from 'react'
import { useRecoilState } from 'recoil'
import { hubPageNationOffsetAtom } from '@/recoil/hubPagenationAtom'

const PageNation = () => {
  const [offset, setOffset] = useRecoilState(hubPageNationOffsetAtom)
  return (
    <div className="flex text-4xl gap-6 p-3">
      <FaChevronLeft
        className=" cursor-pointer"
        onClick={() =>
          setOffset((prev) => {
            if (prev - 10 < 0) {
              return 0
            }
            return prev - 10
          })
        }
      />
      {offset / 10 + 1}
      <FaChevronRight className=" cursor-pointer" onClick={() => setOffset((prev) => prev + 10)} />
    </div>
  )
}

export default PageNation
