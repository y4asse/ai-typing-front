'use client'

import ThemaInput from '@/app/components/input/themaInput'
import AnimationTitle from '../../components/animationTitle/animationTitle'
import StartGameBtn from '@/app/components/buttons/startGameBtn'
import GoBackBtn from '../buttons/goBackBtn'
import Link from 'next/link'
import useAitext from '@/hooks/useAitext'
const Thema = () => {
  const { handleClick } = useAitext()
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-24 h-screen">
        <GoBackBtn />
        <div>
          <AnimationTitle text="テーマを入力してください" />
        </div>
        <div>
          <ThemaInput />
          <p className="mt-3">※テーマの内容によってはうまくAIが処理できなかったり，生成に時間がかかる場合があります</p>
          <p className="">※AIが文を生成するので不完全な文章が生成される場合があります</p>
          <p className="">
            ※ゲームの詳細なルールは
            <Link href={'/about'} className="underline">
              遊び方
            </Link>
            をご覧ください
          </p>
        </div>
        <div className="w-1/3">
          <StartGameBtn handleClick={handleClick} />
        </div>
      </div>
    </>
  )
}

export default Thema
