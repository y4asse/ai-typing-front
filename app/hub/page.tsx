import React from 'react'
import AnimationTitle from '../components/animationTitle/animationTitle'
import HubList from '../components/hub/hubList'
import Tab from '../components/hub/tab'
import PageNation from '../components/hub/pageNation'

const getTotalGameCount = async () => {
  try {
    const res: number = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/totalGameCount`, {
      method: 'GET',
      cache: 'no-cache'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .catch((e) => {
        throw new Error(e)
      })
    return res
  } catch (e) {
    console.log(e)
    return null
  }
}

const getTotalLikedGameCount = async () => {
  try {
    const res: number = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/likedGameIdCount`, {
      method: 'GET',
      cache: 'no-cache'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .catch((e) => {
        throw new Error(e)
      })
    return res
  } catch (e) {
    console.log(e)
    return null
  }
}

const Hub = async () => {
  const totalGameCount = await getTotalGameCount()
  const totalLikedGameCount = await getTotalLikedGameCount()
  return (
    <div className="h-screen flex justify-center items-center text-6xl font-bold flex-col ">
      <AnimationTitle text="テキスト広場" />
      <Tab />
      <HubList />
      <PageNation totalGameCount={totalGameCount ?? 10} totalLikedGameCount={totalLikedGameCount ?? 10} />
    </div>
  )
}

export default Hub
