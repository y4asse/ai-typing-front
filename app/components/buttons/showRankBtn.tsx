import React from 'react'
import { GiStairs } from 'react-icons/gi'

const ShowRank = ({ setIsShowRank }: { setIsShowRank: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <button
      onClick={() => setIsShowRank((prev) => !prev)}
      className=" border border-gray-500 shadow-btn bg-btn hover:bg-btnHover hover:shadow-btnHover hover:text-gray-800 text-center w-[300px]  rounded-xl py-8   duration-200 transition-all text-2xl font-semibold   tracking-widest hover:scale-95     "
    >
      <GiStairs className="inline-block mr-5" />
      順位を表示する
    </button>
  )
}

export default ShowRank
