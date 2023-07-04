import React from 'react'
import AnimationTitle from '../components/animationTitle/animationTitle'
import HubList from '../components/hub/hubList'
import Tab from '../components/hub/tab'

const Hub = () => {
  return (
    <div className="h-screen flex justify-center items-center text-6xl font-bold flex-col ">
      <AnimationTitle text="テキスト広場" />
      <Tab />
      <HubList />
    </div>
  )
}

export default Hub
