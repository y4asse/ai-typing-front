'use client'

import Link from "next/link"

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-700 text-white flex justify-center gap-5 py-1 items-center">
      <span>2023</span>
      <a href="https://twitter.com/y4isse" target="_blank" rel="noopener noreferrer" className=" underline">
        y4isse
      </a>
      <Link className=" cursor-pointer" href={"/privacypolicy"}>
        プライバシーポリシー
      </Link>
      <span>Web Services by Yahoo! JAPAN （https://developer.yahoo.co.jp/sitemap/）</span>
    </footer>
  )
}

export default Footer
