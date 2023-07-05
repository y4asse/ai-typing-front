'use client'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import React from 'react'
import { useRecoilState } from 'recoil'
import { hubPageNationOffsetAtom } from '@/recoil/hubPagenationAtom'

const PageNation = ({ totalGameCount }: { totalGameCount: number }) => {
  const [offset, setOffset] = useRecoilState(hubPageNationOffsetAtom)
  return (
    <div className="flex text-4xl gap-6 p-3">
      <FaChevronLeft
        className=" cursor-pointer"
        onClick={() =>
          setOffset((prev) => {
            if (prev - 1 < 0) {
              return 0
            }
            return prev - 1
          })
        }
      />
      {offset + 1}
      <FaChevronRight
        className=" cursor-pointer"
        onClick={() =>
          setOffset((prev) => {
            if (prev + 2 > Math.ceil(totalGameCount / 10)) {
              return prev
            }
            return prev + 1
          })
        }
      />
    </div>
  )
}

export default PageNation
