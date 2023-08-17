import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

const GameMode = () => {
  const [game] = useRecoilState(gameAtom)
  const { thema } = game
  return (
    <div className=" row-start-1 col-start-2 flex justify-center items-center  font-extrabold flex-col gap-5">
      <div className="text-4xl">
        {/* {mode === 'standard' ? 'スタンダード' : mode === 'timeLimit' ? 'タイムリミット' : ''} */}
        {thema}
      </div>
    </div>
  )
}

export default GameMode
