import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="shadow-xl p-2 fixed w-screen bg-primary z-40">
      <div className="w-[1200px] mx-auto flex justify-between h-[50px] items-center">
        <Link className="text-3xl" href="/">
          AI Typing
        </Link>
      </div>
    </header>
  )
}

export default Header
