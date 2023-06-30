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
              throw new Error('internal server error')
          }
        })
        const idToken = await userCredential.user.getIdToken()
        await signInByNextAuth('credentials', {
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
              throw new Error('internal server error')
          }
        })
        const idToken = await userCredential.user.getIdToken()
        await signInByNextAuth('credentials', {
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
    }
  }
  return (
    <>
      <form>
        <label>
          email
          <input value={email} className="border border-black" type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          password
          <input
            value={password}
            className="border border-black"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>
      <button onClick={handleClick}>{method === 'signIn' ? 'サインイン' : 'アカウントを作成'}</button>
      <p>
        {method === 'signIn' ? 'アカウント新規作成する' : 'アカウントをすでに持っている方'}は
        <button className="underline" onClick={() => setMethod(method === 'signIn' ? 'signUp' : 'signIn')}>
          こちら
        </button>
      </p>
    </>
  )
}

export default Email
