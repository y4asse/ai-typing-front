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
      <div className="flex justify-evenly items-center flex-col h-screen">
        <GoBackBtn />
        <div>
          <AnimationTitle text="テーマを入力してください" />
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleClick()
            }}
          >
            <ThemaInput />
          </form>
          <p className="mt-3">
            ※テーマの内容によってはうまくAIが処理できなかったり、不完全な文章が生成される場合があります
          </p>
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
