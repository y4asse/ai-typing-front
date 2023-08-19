import AnimationTitle from '../components/animationTitle/animationTitle'
import RankingList from '../components/ranking/rankingList'

const Ranking = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-3">
      <AnimationTitle text="ランキング Top10" />
      <p>※不正防止のため総入力キー数が100個以上の時のみランキングに追加されます</p>
      <RankingList />
    </div>
  )
}

export default Ranking
