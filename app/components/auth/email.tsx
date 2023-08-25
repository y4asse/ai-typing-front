'use client'

import { auth } from '@/firebase/client'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { use, useState } from 'react'
import { signIn as signInByNextAuth } from 'next-auth/react'

const Email = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [method, setMethod] = useState<'signIn' | 'signUp'>('signIn')

  const handleClick = async () => {
    if (!email) {
      alert('メールアドレスを入力してください')
      return
    }
    if (!password) {
      alert('パスワードを入力してください')
      return
    }
    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください')
      return
    }

    if (method === 'signIn') {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
          const errorCode = error.code
          switch (errorCode) {
            case 'auth/invalid-email':
              throw new Error('メールアドレスの形式が正しくありません')
            case 'auth/user-disabled':
              throw new Error('開発者にお問い合わせください')
            case 'auth/user-not-found':
              throw new Error('メールアドレスが間違っています')
            case 'auth/wrong-password':
              throw new Error('パスワードが間違っています')
            default:
              throw new Error('internal server error' + errorCode)
          }
        })
        const idToken = await userCredential.user.getIdToken()
        const refreshToken = userCredential.user.refreshToken
        await signInByNextAuth('credentials', {
          refreshToken,
          idToken,
          callbackUrl: '/'
        })
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
          return
        }
        alert(error)
        return
      }
    } else if (method === 'signUp') {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
          const errorCode = error.code
          switch (errorCode) {
            case 'auth/email-already-in-use':
              throw new Error('すでに登録されているメールアドレスです')
            case 'auth/invalid-email':
              throw new Error('メールアドレスの形式が正しくありません')
            case 'auth/operation-not-allowed':
              throw new Error('開発者にお問い合わせください')
            case 'auth/weak-password':
              throw new Error('パスワードは6文字以上で入力してください')
            default:
              throw new Error('internal server error' + errorCode)
          }
        })
        const idToken = await userCredential.user.getIdToken()
        const refreshToken = userCredential.user.refreshToken
        await signInByNextAuth('credentials', {
          idToken,
          refreshToken,
          callbackUrl: '/'
        })
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
          return
        }
        alert(error)
        return
      }
    }
  }
  return (
    <div className="border-4 border-black rounded-xl p-12 text-2xl font-bold flex flex-col gap-5 w-1/2">
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => {
          e.preventDefault()
          handleClick()
        }}
      >
        email
        <input
          required
          placeholder="example@example.com"
          value={email}
          className="border-2 border-black bg-transparent p-3 rounded-xl placeholder:text-black placeholder:opacity-10 "
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => {
          e.preventDefault()
          handleClick()
        }}
      >
        password
        <input
          required
          placeholder="6文字以上で入力してください"
          value={password}
          className="border-2 border-black bg-transparent p-3 rounded-xl placeholder:text-black placeholder:opacity-10 "
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

      <button
        className=" mt-10 border-4 border-black rounded-xl p-5 hover:bg-black hover:text-white transition-all duration-200"
        onClick={handleClick}
      >
        {method === 'signIn' ? 'サインイン' : 'アカウントを作成'}
      </button>
      <p className=" font-medium text-xl text-center">
        ※{method === 'signIn' ? 'アカウントを新規作成する' : 'アカウントをすでに持っている方'}は
        <button className="underline" onClick={() => setMethod(method === 'signIn' ? 'signUp' : 'signIn')}>
          こちら
        </button>
      </p>
    </div>
  )
}

export default Email
