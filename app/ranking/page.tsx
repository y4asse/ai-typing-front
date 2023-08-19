import AnimationTitle from '../components/animationTitle/animationTitle'
import RankingList from '../components/ranking/rankingList'
import Tab from '../components/ranking/tab'

const Ranking = () => {
  return (
    <div className="h-screen flex flex-col justify-evenly items-center ">
      <AnimationTitle text="ランキング Top10" />
      <RankingList />
    </div>
  )
}

export default Ranking
