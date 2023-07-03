import RecoilPrivider from '@/recoil/recoilRoot/recoilRoot'
import Footer from './components/layout/footer'
import './globals.css'
import { Sora } from 'next/font/google'
import GoogleAnalytics from './components/google/googleAnalytics'
import SessionProvider from './components/sessionProvider/sessionProvider'

const sora = Sora({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Typing',
  description:
    'AIを使った新世代タイピングゲーム!AIが文章を作ってくれます．タイピング初心者の方や，楽しく練習したいという方におすすめです！'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SessionProvider>
        <RecoilPrivider>
          <body className={sora.className}>
            <div className="bg-[url('/img/background.png')] bg-center bg-cover overflow-hidden ">
              {children}
              <Footer />
            </div>
          </body>
        </RecoilPrivider>
      </SessionProvider>
    </html>
  )
}
