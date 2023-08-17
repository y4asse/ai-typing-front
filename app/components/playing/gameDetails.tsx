import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

const GameDetails = () => {
  const [game] = useRecoilState(gameAtom)
  const { typeNum, missTypeNum, timer } = game
  return (
    <div className=" row-start-3 col-start-2 col-span-2 flex items-center pt-16 flex-col text-3xl">
      <table>
        <tbody>
          <tr className="">
            <td>正答数</td>
            <td>:</td>
            <td className="font-bold w-20 text-end ">{typeNum}</td>
            <td className="font-bold">words</td>
          </tr>
          <tr>
            <td>ミスタイプ数</td>
            <td>:</td>
            <td className="font-bold w-20 text-end">{missTypeNum}</td>
            <td className="font-bold">words</td>
          </tr>
          <tr>
            <td>時間</td>
            <td>:</td>
            <td className="font-bold w-20 text-end">{Math.round(timer / 1000)}</td>
            <td className="font-bold">s</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default GameDetails
