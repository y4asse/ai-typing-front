import GoBackBtn from '../components/buttons/goBackBtn'
import Sound from '../components/buttons/sound'

export default function Layaout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute bottom-10 right-3">
        <Sound />
      </div>
      <GoBackBtn />
      {children}
    </>
  )
}
