'use client'

import { auth } from '@/firebase/client'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { signIn as signInByNextAuth } from 'next-auth/react'
import Link from 'next/link'

const SignInBtns = () => {
  const router = useRouter()
  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider).catch((err) => {
        const errorCode = err.code
        switch (errorCode) {
          case 'auth/account-exists-with-different-credential':
            throw new Error('このメールアドレスはすでに登録されています')
          case 'auth/credential-already-in-use':
            throw new Error('このメールアドレスはすでに登録されています')
          case 'auth/email-already-in-use':
            throw new Error('このメールアドレスはすでに登録されています')
          case 'auth/invalid-email':
            throw new Error('メールアドレスの形式が正しくありません')
          case 'auth/network-request-failed':
            throw new Error('ネットワークエラーです')
          default:
            throw new Error('internal server error' + errorCode)
        }
      })
      const idToken = await userCredential.user.getIdToken()
      const refreshToken = userCredential.user.refreshToken
      await signInByNextAuth('credentials', {
        idToken,
        refreshToken,
        callbackUrl: '/mypage'
      })
    } catch (err) {
      alert(err)
      return
    }
  }
  const handleSignInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider()
      const userCredential = await signInWithPopup(auth, provider).catch((err) => {
        const errorCode = err.code
        switch (errorCode) {
          case 'auth/account-exists-with-different-credential':
            throw new Error('このメールアドレスはすでに登録されています')
          case 'auth/credential-already-in-use':
            throw new Error('このメールアドレスはすでに登録されています')
          case 'auth/email-already-in-use':
            throw new Error('このメールアドレスはすでに登録されています')
          case 'auth/invalid-email':
            throw new Error('メールアドレスの形式が正しくありません')
          case 'auth/network-request-failed':
            throw new Error('ネットワークエラーです')
          default:
            throw new Error(' server error' + errorCode)
        }
      })
      const idToken = await userCredential.user.getIdToken()
      const refreshToken = userCredential.user.refreshToken
      await signInByNextAuth('credentials', {
        idToken,
        refreshToken,
        callbackUrl: '/mypage'
      })
    } catch (err) {
      alert(err)
      return
    }
  }

  return (
    <div className="flex flex-col border-black border-4 rounded-xl p-10 gap-10">
      <div>
        <p className="text-xl font-bold mb-3">サインインすると過去のテキストデータを見ることができます</p>
        <p>
          ※プライバシーポリシーについては
          <Link href={'privacypolicy'} className="underline">
            こちら
          </Link>
          をご覧ください
        </p>
      </div>
      <Link
        href={'/auth/email'}
        className="text-2xl font-bold border-gray-800 border rounded-xl p-5 hover:bg-btnHover bg-btn hover:shadow-btnHover shadow-btn transition-all duration-200 text-center"
      >
        <HiOutlineMail className="inline-block mr-3" />
        メールアドレスでサインイン
      </Link>
      <button
        onClick={handleSignInWithGithub}
        className="text-2xl font-bold border-gray-800 border rounded-xl p-5 hover:bg-btnHover bg-btn hover:shadow-btnHover shadow-btn transition-all duration-200 text-center"
      >
        <FaGithub className="inline-block mr-3" />
        GitHubでサインイン
      </button>
      <button
        onClick={handleSignInWithGoogle}
        className="text-2xl font-bold border-gray-800 border rounded-xl p-5 hover:bg-btnHover bg-btn hover:shadow-btnHover shadow-btn transition-all duration-200 text-center"
      >
        <FaGoogle className="inline-block mr-3" />
        googleでサインイン
      </button>
    </div>
  )
}

export default SignInBtns
