import GoBackBtn from '@/app/components/buttons/goBackBtn'
import { notFound } from 'next/navigation'
import React from 'react'

type CreatedText = {
  id: string
  text: string
  hiragana: string
  game_id: string
  is_post: false
}

const fetchGameText = async (gameId: string) => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const body = JSON.stringify({
    game_id: gameId
  })
  const request = new Request(`${API_URL}/createdText`, {
    cache: 'force-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  try {
    const data: CreatedText[] = await fetch(request).then((res) => {
      if (!res.ok) {
        throw new Error('データを取得できませんでした' + res.statusText)
      }
      return res.json()
    })
    return data
  } catch (e) {
    console.log(e)
    return []
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const createdText = await fetchGameText(params.id)
  if (createdText.length === 0) {
    //not found
    return notFound()
  }
  return (
    <div className="h-screen flex justify-center items-center text-2xl">
      <GoBackBtn />
      <div className="border-black border-4 p-10 w-2/3 rounded-xl">
        {createdText.map((value) => {
          return (
            <h1 className="mb-5" key={value.id}>
              ・{value.text}
            </h1>
          )
        })}
      </div>
    </div>
  )
}

export default Page
