'use client'

import { Router } from 'next/router'
import ReactGA from 'react-ga'

export default function MyApp({ children }: { children: React.ReactNode }) {
  // Google Analyticsの初期化
  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
    ReactGA.initialize(`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`)

    // ページ変更時にGoogle Analyticsにページビューを送信
    Router.events.on('routeChangeComplete', (url) => {
      ReactGA.pageview(url)
    })
  }

  return <>{children}</>
}
