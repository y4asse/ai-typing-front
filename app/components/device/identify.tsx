'use client'

import React, { ReactNode, useEffect, useState } from 'react'

const Identify = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    setIsMobile(mobile)
  }, [])
  return (
    <>
      {isMobile ? (
        <div className="h-screen flex justify-center items-center">
          <p>こちらのサイトはpcのみ対応しております.</p>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default Identify
