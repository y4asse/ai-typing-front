import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { batchList } from '@/data/batches'
import { getFreshIdToken } from '@/hooks/getFreshIdToken'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const getUserBatch = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return null
  }
  const refreshToken = session.user.refreshToken
  const freshIdToken = await getFreshIdToken(refreshToken)
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/batches`, {
    cache: 'no-cache',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${freshIdToken}`
    }
  }).then((res) => {
    if (!res.ok) {
      console.log(res.statusText)
      return null
    }
    return res.json()
  })
  const userBatch: Batch[] | null = data
  return userBatch
}

const Batch = async () => {
  const userBatch = await getUserBatch()
  return (
    <div className="w-full shadow-btn bg-btn mb-10 border-gray-600 border rounded-xl grid grid-cols-4 grid-rows-2 px-2 py-4">
      {batchList.map((batch, index) => {
        if (userBatch && userBatch.find((userBatch) => userBatch.name == batch.id)) {
          return (
            <div className="px-4 my-auto mt-5" key={index}>
              <div className="flex flex-col items-center justify-evenly shadow-xl rounded-3xl p-1">
                <h2 className="text-xl font-bold">{batch.name}</h2>
                <Image alt={batch.alt} src={batch.image} className="px-5" width={1500} height={150} />
                <p className=" text-gray-500">{batch.description}</p>
                <span className="rounded-lg px-1 bg-black bg-opacity-50 text-white">{batch.border}～</span>
              </div>
            </div>
          )
        } else if (!batch.isHidden) {
          return (
            <div className="px-4 my-auto mt-5" key={index}>
              <div className="flex flex-col items-center justify-evenly shadow-xl rounded-3xl p-1">
                <h2 className="text-xl font-bold">{batch.name}</h2>
                <Image
                  alt={batch.alt}
                  src={batch.image}
                  className="px-5"
                  style={{ filter: 'grayscale(100%)', opacity: '40%' }}
                  width={1500}
                  height={150}
                />
                <p className=" text-gray-500">{batch.description}</p>
                <span className="rounded-lg px-1 bg-black bg-opacity-50 text-white">{batch.border}～</span>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Batch
