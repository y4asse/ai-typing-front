import Email from '@/app/components/auth/email'
import GoBackBtn from '@/app/components/buttons/goBackBtn'
import React from 'react'

const Page = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <GoBackBtn/>
      <Email />
    </div>
  )
}

export default Page
