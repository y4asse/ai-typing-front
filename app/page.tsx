import GoDifficulty from './components/buttons/goDifficultyBtn'
import GoHubBtn from './components/buttons/goHubBtn'
import GoRankingBtn from './components/buttons/goRankingBtn'

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-24 h-screen">
        <div className='relative'>
          <h1 className='text-8xl font-extrabold'>AI Typing</h1>
          <h2 className='absolute right-0 top-full translate-x-1/2 -rotate-6 text-xl text-gray-500'>新世代AIタイピングゲーム</h2>
        </div>
        <div className="flex justify-center items-center flex-col w-2/5 gap-5">
          <GoDifficulty />
          <GoHubBtn />
          <GoRankingBtn />
        </div>
      </div>
    </>
  )
}
