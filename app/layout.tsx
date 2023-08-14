import RecoilPrivider from '@/recoil/recoilRoot/recoilRoot'
import Footer from './components/layout/footer'
import './globals.css'
import { Sora } from 'next/font/google'
import SessionProvider from './components/sessionProvider/sessionProvider'
import Script from 'next/script'
import { isMobile } from 'react-device-detect'
import GlobalMenu from './components/buttons/globalMenu'

const sora = Sora({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Typing 🚀 新世代タイピングゲーム ',
  description:
    'AIを使った新世代タイピングゲーム!AIが文章を作ってくれます．タイピング初心者の方や，楽しく練習したいという方におすすめです！'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_GA_ID && (
        <head>
          <Script
            async
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
           `
            }}
          />
          <link
            rel="icon"
            href="https://firebasestorage.googleapis.com/v0/b/cafeteria-fa0bf.appspot.com/o/aikun_0811015123.png?alt=media&token=e1579c8d-400c-408d-8b33-b7ea3a8fb5f7"
          />
          <meta property="og:type" content="(1)ページタイプ" />
          <meta property="og:title" content="AI Typing 🚀 新世代タイピングゲーム " />
          <meta
            property="og:description"
            content="AIが文を作成する新世代タイピングゲーム.あなただけの文でタイピングをしよう！"
          />
          <meta property="og:url" content="https://ai-typing.app" />
          <meta property="og:site_name" content="AI Typing" />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/cafeteria-fa0bf.appspot.com/o/ai-typin.png?alt=media&token=d29bd47b-d5ba-46bb-bb18-5ab20c255010"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@yAisse" />
        </head>
      )}
      <SessionProvider>
        <RecoilPrivider>
          <body className={sora.className}>
            <div className="bg-[url('/img/background.png')] bg-center bg-cover overflow-hidden ">
              {isMobile && <p className="text-center text-xl font-bold">このアプリはPCでの利用を想定しています．</p>}
              <GlobalMenu />
              {children}
              <Footer />
            </div>
          </body>
        </RecoilPrivider>
      </SessionProvider>
    </html>
  )
}
