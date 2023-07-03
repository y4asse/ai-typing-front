import AuthBtn from '../components/buttons/authBtn'
import GoBackBtn from '../components/buttons/goBackBtn'

export default function Layaout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoBackBtn />
      {children}
    </>
  )
}
