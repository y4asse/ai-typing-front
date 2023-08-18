import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { adminAuth } from '@/firebase/admin'
import { auth } from '@/firebase/client'

export const authOptions: NextAuthOptions = {
  providers: [
    // ログイン時にFirebaseのJWTトークンを取得
    CredentialsProvider({
      credentials: {},
      authorize: async ({ idToken, refreshToken }: any, _req) => {
        if (idToken) {
          try {
            const decoded = await adminAuth.verifyIdToken(idToken)
            return { id: decoded.uid, ...decoded, idToken: idToken, refreshToken: refreshToken }
          } catch (err) {
            console.error(err)
          }
        }
        return null
      }
    })
  ],

  session: {
    strategy: 'jwt'
  },
  callbacks: {
    // JWTトークンからユーザ情報を取得
    jwt({ token, user }) {
      if (user) {
        token.idToken = user.idToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    // sessionにJWTトークンからのユーザ情報を格納
    session({ session, token, user }) {
      //sessionにユーザ情報を格納
      session.user.uid = token.sub!
      session.user.idToken = token.idToken
      session.user.refreshToken = token.refreshToken
      return session
    }
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
