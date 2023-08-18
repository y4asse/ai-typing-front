export const getFreshIdToken = async (refreshToken: string) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/refreshToken`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  }).catch((e) => {
    console.error(e)
    return null
  })
  if (!data) return null
  const freshIdToken = (await data.json()).id_token
  return freshIdToken as string
}
