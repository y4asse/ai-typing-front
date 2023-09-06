import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getFreshIdToken } from '@/hooks/getFreshIdToken'
import { getServerSession } from 'next-auth'
import React from 'react'

const getUserBatch = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return null
  }
  const refreshToken = session.user.refreshToken
  const freshIdToken = await getFreshIdToken(refreshToken)
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/batches`, {
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
  console.log(userBatch)
  const batchList = [
    {
      id: 'earth',
      name: '地球',
      description: '出発',
      border: 0,
      image:
        'https://firebasestorage.googleapis.com/v0/b/ai-typing-c06b9.appspot.com/o/earth.png?alt=media&token=ab5e4d51-ce6f-400e-8004-9f639e098c6f',
      alt: 'earth_batch'
    },
    {
      id: 'moon',
      name: '月',
      description: '初めの一歩',
      border: 500,
      image:
        'https://firebasestorage.googleapis.com/v0/b/ai-typing-c06b9.appspot.com/o/moon.png?alt=media&token=1e4e6e0f-4dea-4bc2-805b-b5403b77e2a2',
      alt: 'moon_batch'
    },
    {
      id: 'mars',
      name: '火星',
      description: '出発',
      border: 1000,
      image:
        'https://firebasestorage.googleapis.com/v0/b/ai-typing-c06b9.appspot.com/o/earth.png?alt=media&token=ab5e4d51-ce6f-400e-8004-9f639e098c6f',
      alt: 'earth_batch'
    },
    {
      id: 'mercury',
      name: '水星',
      description: '出発',
      border: 1500,
      image:
        'https://firebasestorage.googleapis.com/v0/b/ai-typing-c06b9.appspot.com/o/earth.png?alt=media&token=ab5e4d51-ce6f-400e-8004-9f639e098c6f',
      alt: 'earth_batch'
    },
    {
      id: 'jupiter',
      name: '木星',
      description: '出発',
      border: 2000,
      image:
        'https://firebasestorage.googleapis.com/v0/b/ai-typing-c06b9.appspot.com/o/earth.png?alt=media&token=ab5e4d51-ce6f-400e-8004-9f639e098c6f',
      alt: 'earth_batch'
    },
    {
      id: 'venus',
      name: '金星',
      description: '出発',
      border: 2500,
      image:
        'https://firebasestorage.googleapis.com/v0/b/ai-typing-c06b9.appspot.com/o/earth.png?alt=media&token=ab5e4d51-ce6f-400e-8004-9f639e098c6f',
      alt: 'earth_batch'
    },
    {
      id: 'saturn',
      name: '土星',
      description: '出発',
      border: 3000,
      image:
        'https://firebasestorage.googleapis.com/v0/b/ai-typing-c06b9.appspot.com/o/earth.png?alt=media&token=ab5e4d51-ce6f-400e-8004-9f639e098c6f',
      alt: 'earth_batch'
    },
    {
      id: 'sun',
      name: '太陽',
      description: '出発',
      border: 3500,
      image:
        'https://firebasestorage.googleapis.com/v0/b/ai-typing-c06b9.appspot.com/o/earth.png?alt=media&token=ab5e4d51-ce6f-400e-8004-9f639e098c6f',
      alt: 'earth_batch'
    },
    {
      id: 'universe',
      name: '宇宙',
      description: '出発',
      border: 4500,
      image:
        'https://firebasestorage.googleapis.com/v0/b/ai-typing-c06b9.appspot.com/o/earth.png?alt=media&token=ab5e4d51-ce6f-400e-8004-9f639e098c6f',
      alt: 'earth_batch'
    }
  ]
  return (
    <div className="w-full shadow-btn bg-btn mb-10 border-gray-600 border rounded-xl grid grid-cols-4 grid-rows-2 px-2">
      {batchList.map((batch, index) => {
        return (
          <div className="px-4 my-auto mt-5" key={index}>
            <div className="flex flex-col items-center justify-evenly shadow-xl rounded-3xl p-1">
              <h2 className="text-xl font-bold">{batch.name}</h2>
              {userBatch && userBatch.find((userBatch) => userBatch.name == batch.id) ? (
                <img alt={batch.alt} src={batch.image} className="px-5" />
              ) : (
                <img
                  alt={batch.alt}
                  src={batch.image}
                  className="px-5"
                  style={{ filter: 'grayscale(100%)', opacity: '50%' }}
                />
              )}
              <p className=" text-gray-500">{batch.description}</p>
              <span className="rounded-lg px-1 bg-black bg-opacity-50 text-white">{batch.border}～</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Batch
