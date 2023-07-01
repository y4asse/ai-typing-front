import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { adminAuth } from '@/firebase/admin'

export const authOptions: NextAuthOptions = {
  providers: [
    // ログイン時にFirebaseのJWTトークンを取得
    CredentialsProvider({
      credentials: {},
      authorize: async ({ idToken }: any, _req) => {
        if (idToken) {
          try {
            const decoded = await adminAuth.verifyIdToken(idToken)
            return { id: decoded.uid, ...decoded }
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
    jwt({ token }) {
      return { ...token }
    },
    // sessionにJWTトークンからのユーザ情報を格納
    session({ session, token }) {
      //sessionにユーザ情報を格納
      session.user.uid = token.sub!
      return session
    }
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
