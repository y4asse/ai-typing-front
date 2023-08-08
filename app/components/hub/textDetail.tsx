import React from 'react'
import { notFound } from 'next/navigation'

type CreatedText = {
  id: string
  text: string
  hiragana: string
  game_id: string
  is_post: false
}

const fetchGameText = async (gameId: string) => {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const request = new Request(`${API_URL}/createdText/${gameId}`, {
    cache: 'force-cache',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
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
const TextDetail = async ({ gameId }: { gameId: string }) => {
  const createdText = await fetchGameText(gameId)
  if (createdText.length === 0) {
    return notFound()
  }
  return (
    <>
      {createdText.map((value) => {
        return (
          <h1 className="mb-5" key={value.id}>
            ・{value.text}
          </h1>
        )
      })}
    </>
  )
}

export default TextDetail
