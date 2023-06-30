'use client'

import { ReactNode } from 'react'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

type SessionProviderProps = {
  children: ReactNode
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}

export default SessionProvider
