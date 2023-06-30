import SignInBtns from '../components/auth/signInBtns'
import GoBackBtn from '../components/buttons/goBackBtn'

const Auth = () => {
  return (
    <>
      <GoBackBtn />
      <div className="h-screen flex justify-center items-center flex-col gap-5">
        <SignInBtns />
      </div>
    </>
  )
}

export default Auth
