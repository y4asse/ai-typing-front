'use client'

import React, { ReactNode } from 'react'
import { isMobile } from 'react-device-detect'

const Identify = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {isMobile ? (
        <div className="h-screen flex justify-center items-center">
          <p>こちらのサイトはpcのみ対応しております.</p>
        </div>
      ) : (
        { children }
      )}
    </>
  )
}

export default Identify
