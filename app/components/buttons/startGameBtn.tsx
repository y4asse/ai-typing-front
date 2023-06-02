'use client'

import { gameAtom } from '@/recoil/gameAtom'
import { error } from 'console'
import { useRecoilState } from 'recoil'

type AiResponse = {
  text: string[]
}

const StartGameBtn = () => {
  const [game] = useRecoilState(gameAtom)
  const handleClick = async () => {
    if (game.thema === '') {
      alert('テーマを入力してください')
      return
    }
    console.log('importing...')
    await fetch('http://localhost:8080/aiText', {
      body: JSON.stringify({ thema: game.thema }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(async (res) => {
        if (!res.ok) {
          alert('サーバーエラーが発生しました．もう一度お試しください．')
          return
        }
        const data: AiResponse = await res.json()
        console.log(data.text)
      })
      .catch((error) => {
        alert('通信エラーが発生しました．通信環境を確認してください')
        return
      })
  }
  return (
    <div
      className="cursor-pointer text-center w-full  border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow shadow-gray-400 tracking-widest"
      onClick={handleClick}
    >
      スタート
    </div>
  )
}

export default StartGameBtn
