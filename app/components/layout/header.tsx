import React from 'react'
import GlobalMenu from '../buttons/globalMenu'

const Header = () => {
  return (
    <header className="shadow-xl p-2 fixed w-screen bg-primary z-40">
      <div className="w-[1200px] mx-auto flex justify-between h-[50px] items-center">
        <span className="text-3xl">AI Typing</span>
      </div>
    </header>
  )
}

export default Header
