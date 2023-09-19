'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu, GiStairs } from 'react-icons/gi'
import { MdMenuBook } from 'react-icons/md'
import { MdForest } from 'react-icons/md'
import { RiCloseFill } from 'react-icons/ri'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdRocketLaunch } from 'react-icons/md'

const GlobalMenu = () => {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [isShowMenuDetail, setIsShowMenuDetail] = useState(false)

  //Menuのボタン押したら閉じるボタン
  const closeGlobalMenu = () => {
    setIsShowMenu(false)
    setIsShowMenuDetail(false)
  }

  //どっかクリックしたらメニュー閉じる
  const handleClickSome = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return
    if (e.target.id === 'globalMenu') return
    setIsShowMenuDetail((prev) => {
      if (prev) return false
      return prev
    })
    setIsShowMenu((prev) => {
      if (prev) return false
      return prev
    })
  }
  useEffect(() => {
    window.addEventListener('click', handleClickSome, true)
    return () => {
      window.removeEventListener('click', handleClickSome, true)
    }
  }, [])
  const data = [
    {
      icon: <MdRocketLaunch />,
      text: '遊ぶ',
      link: '/play/standard'
    },
    {
      icon: <GiStairs />,
      text: 'ランキング',
      link: '/ranking'
    },
    {
      icon: <MdForest />,
      text: '広場',
      link: '/hub'
    },
    {
      icon: <BsFillPersonFill />,
      text: 'マイページ',
      link: '/mypage'
    },
    {
      icon: <MdMenuBook />,
      text: 'タイトル',
      link: '/'
    }
  ]
  const handleClick = () => {
    if (isShowMenu == true) {
      setIsShowMenuDetail(false)
      setIsShowMenu(false)
    } else {
      setIsShowMenu(true)
      setIsShowMenuDetail(true)
    }
  }

  return (
    <div className={`z-50 flex flex-col fixed top-2 right-2`}>
      <button
        id="globalMenu"
        className="border border-gray-500 bg-btn hover:bg-btnHover hover:shadow-btnHover hover:text-gray-800 text-2xl font-semibold   tracking-widest
        text-end   ml-auto  p-2 rounded-full   duration-200 transition-all  shadow-btn"
        onClick={handleClick}
      >
        {isShowMenu ? <RiCloseFill className="text-4xl " /> : <GiHamburgerMenu className="text-4xl" />}
      </button>
      <div
        className={` flex items-center flex-col overflow-hidden justify-evenly   border-black ${
          isShowMenu ? ' h-96' : ' h-0 '
        }`}
      >
        {data.map((value, index) => {
          return (
            <div className="flex items-center" key={index}>
              <span
                className={`font-bold mr-1 text-end overflow-hidden whitespace-nowrap   border-black   ${
                  isShowMenuDetail ? 'w-20' : 'w-0 '
                }`}
              >
                {value.text}
              </span>
              <Link
                onClick={closeGlobalMenu}
                href={value.link}
                className="
                border border-gray-500 bg-btn hover:bg-btnHover hover:shadow-btnHover hover:text-gray-800 text-center font-semibold   tracking-widest
                text-4xl  p-2   rounded-full"
              >
                {value.icon}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GlobalMenu
