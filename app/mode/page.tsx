import SelectModeBtn from '../components/buttons/selectModeBtn'
import AnimationTitle from '../components/animationTitle/animationTitle'
import GoBackBtn from '../components/buttons/goBackBtn'
const Mode = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-24 h-screen">
      <GoBackBtn />
      <div>
        <AnimationTitle text="モードを選択してください" />
      </div>
      <div className="flex justify-center items-center flex-col w-2/5 gap-5">
        <SelectModeBtn mode="standard" />
        <SelectModeBtn mode="timeLimit" />
      </div>
    </div>
  )
}

export default Mode
