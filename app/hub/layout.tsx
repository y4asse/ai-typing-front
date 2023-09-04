import GoBackBtn from '../components/buttons/goBackBtn'

export default function Layaout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoBackBtn className="" />
      {children}
    </>
  )
}
