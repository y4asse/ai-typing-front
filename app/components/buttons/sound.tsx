'use client'

import { gameAtom } from '@/recoil/gameAtom'
import React from 'react'
import { IoVolumeMuteSharp, IoVolumeHighSharp } from 'react-icons/io5'
import { useRecoilState } from 'recoil'

const Sound = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const { sound } = game
  return (
    <button
      className=" rounded-full p-2 bg-btn shadow-btn hover:bg-btnHover hover:shadow-btnHover"
      onClick={() => setGame((prev) => ({ ...prev, sound: !prev.sound }))}
    >
      {sound ? <IoVolumeHighSharp className="text-4xl" /> : <IoVolumeMuteSharp className="text-4xl" />}
    </button>
  )
}

export default Sound
