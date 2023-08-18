type Body = {
  grant_type: string
  refresh_token: string
}

export async function POST(request: Request) {
  const body: Body = await request.json()
  const data = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  ).catch((e) => {
    console.error(e)
    return null
  })
  const freshIdToken = (await data?.json()).id_token
  return new Response(JSON.stringify({ id_token: freshIdToken }))
}
