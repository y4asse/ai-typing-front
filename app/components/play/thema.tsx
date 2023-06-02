'use client'

import ThemaInput from '@/app/components/input/themaInput'
import AnimationTitle from '../../components/animationTitle/animationTitle'
import StartGameBtn from '@/app/components/buttons/startGameBtn'
const Thema = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-24 h-screen">
        <div>
          <AnimationTitle text="テーマを入力してください" />
        </div>
        <div>
          <ThemaInput />
          <p className="mt-3">※テーマの内容によってはうまくAIが処理できない場合があるので注意してください</p>
        </div>
        <div className="w-1/3">
          <StartGameBtn handleClick={handleClick} />
        </div>
      </div>
    </>
  )
}

export default Thema
