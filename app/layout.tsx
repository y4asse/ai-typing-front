import RecoilPrivider from '@/recoil/recoilRoot/recoilRoot'
import Footer from './components/layout/footer'
import './globals.css'
import { Sora } from 'next/font/google'
import GoogleAnalytics from './components/google/googleAnalytics'
import Identify from './components/device/identify'
import SessionProvider from './components/sessionProvider/sessionProvider'

const sora = Sora({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Typing',
  description: '新世代タイピングゲーム'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Identify>
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
      </Identify>
    </html>
  )
}
