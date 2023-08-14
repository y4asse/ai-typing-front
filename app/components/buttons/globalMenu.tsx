'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { GiStairs } from 'react-icons/gi'
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
    setTimeout(() => {
      setIsShowMenu((prev) => {
        if (prev) return false
        return prev
      })
    }, 300)
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
      setTimeout(() => {
        setIsShowMenu(false)
      }, 300)
    } else {
      setIsShowMenu(true)
      setTimeout(() => {
        setIsShowMenuDetail(true)
      }, 300)
    }
  }

  return (
    <div className="z-10 absolute  top-0 right-0 m-5  flex flex-col ">
      <button
        id="globalMenu"
        className="text-end  ml-auto border-2 border-black p-2 rounded-full hover:bg-black hover:text-white duration-200 transition-all"
        onClick={handleClick}
      >
        {isShowMenu ? <RiCloseFill className="text-4xl" /> : <FiMenu className="text-4xl" />}
      </button>
      <div
        className={` flex items-center flex-col overflow-hidden justify-evenly  duration-300 transition-all   border-black ${
          isShowMenu ? ' h-96' : ' h-0 '
        }`}
      >
        {data.map((value, index) => {
          return (
            <div className="flex items-center" key={index}>
              <span
                className={`font-bold mr-1 text-end overflow-hidden whitespace-nowrap transition-all duration-500  border-black  ${
                  isShowMenuDetail ? 'w-20' : 'w-0 '
                }`}
              >
                {value.text}
              </span>
              <Link
                onClick={closeGlobalMenu}
                href={value.link}
                className="text-4xl border-2 p-2  border-black rounded-full hover:bg-black hover:text-white duration-200 transition-all"
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
