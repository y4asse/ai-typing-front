import { Suspense } from 'react'
import RankingList from '../components/ranking/rankingList'
import Tab from '../components/ranking/tab'
import RankingLoader from '../components/loader/rankingLoader'
import GoBackBtn from '../components/buttons/goBackBtn'

const Ranking = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <GoBackBtn />
      <h1 className="text-6xl font-bold">ランキング Top10</h1>
      <Tab />
      <RankingList />
    </div>
  )
}

export default Ranking
