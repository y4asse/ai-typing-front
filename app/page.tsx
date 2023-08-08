import GoMode from './components/buttons/goModeBtn'
import GoHubBtn from './components/buttons/goHubBtn'
import GoRankingBtn from './components/buttons/goRankingBtn'
import AuthBtn from './components/buttons/authBtn'
import { Suspense } from 'react'
import Spinner from './components/utils/spinner'

export default function Home() {
  return (
    <>
      <Suspense>
        <AuthBtn />
      </Suspense>
      <div className="flex justify-center items-center flex-col gap-24 h-screen">
        <div className="relative">
          <h1 className="text-9xl text-gray-900 font-extrabold [text-shadow:_7px_7px_15px_rgb(0_0_0_/_40%)]">
            AI Typing
          </h1>
          <h2 className="absolute right-0 top-full translate-x-1/2 translate-y-2 -rotate-6 text-xl text-gray-500">
            新世代AIタイピングゲーム🚀
          </h2>
        </div>
        <div className="flex justify-center items-center flex-col w-2/5 gap-5">
          <GoMode />
          <GoRankingBtn />
          <GoHubBtn />
        </div>
      </div>
    </>
  )
}
