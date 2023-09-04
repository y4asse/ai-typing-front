import GoBackBtn from '../components/buttons/goBackBtn'
import Header from '../components/layout/header'

export default function Layaout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
