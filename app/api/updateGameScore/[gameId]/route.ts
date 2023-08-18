import { NextRequest } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: { gameId: string } }) {
  const body = await request.json()
  const { gameId } = params
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/gameScore/${gameId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      score: body.score
    })
  }).catch((e) => {
    console.error(e)
    return null
  })
  if (!data) return new Response(null, { status: 500 })
  return new Response(JSON.stringify({ status: data.status }))
}
