import RankingList from '../components/ranking/rankingList'
import Tab from '../components/ranking/tab'

const Ranking = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <h1 className="text-6xl font-bold">ランキング Top10</h1>
      <Tab />
      <RankingList />
    </div>
  )
}

export default Ranking
