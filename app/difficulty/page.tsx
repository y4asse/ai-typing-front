import SelectDifficultyBtn from '../components/buttons/selectDifficultyBtn'
import AnimationTitle from '../components/animationTitle/animationTitle'
import GoBackBtn from '../components/buttons/goBackBtn'
const Difficulty = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-24 h-screen">
      <GoBackBtn />
      <div>
        <AnimationTitle text="難易度を選択してください" />
      </div>
      <div className="flex justify-center items-center flex-col w-2/5 gap-5">
        <SelectDifficultyBtn difficulty="easy" />
        <SelectDifficultyBtn difficulty="normal" />
        <SelectDifficultyBtn difficulty="hard" />
      </div>
    </div>
  )
}

export default Difficulty
