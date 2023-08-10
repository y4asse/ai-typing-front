import { gameAtom } from '@/recoil/gameAtom'
import React, { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import EffectAnimation from '../utils/effect'
import { Player } from '@lottiefiles/react-lottie-player'

const GameDetails = () => {
  const [game] = useRecoilState(gameAtom)
  const { typeNum, missTypeNum, timer } = game
  const playerRef = useRef<Player>(null)
  useEffect(() => {
    playerRef.current && playerRef.current.stop()
    playerRef.current && playerRef.current.play()
  }, [typeNum])
  return (
    <div className="flex items-center pt-16 flex-col text-3xl">
      <table>
        <tbody>
          <tr className="">
            <td>正答数</td>
            <td>:</td>
            <td className="font-bold w-20 text-end ">
              {typeNum}
              <EffectAnimation playerRef={playerRef} className=" absolute top-0 opacity-50" />
            </td>
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
