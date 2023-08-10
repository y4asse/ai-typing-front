export const getAnalyse = async (
  score: number,
  timeMiliSec: number,
  typeKeyCount: number,
  missTypeCount: number,
  missTypeKey: string[]
) => {
  const accuracy = Math.floor((typeKeyCount / (typeKeyCount + missTypeCount)) * 100)
  const kpm = Math.floor(typeKeyCount / (timeMiliSec / (1000 * 60)))
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/analyse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      score: score.toString(),
      time: (timeMiliSec / 1000).toString(),
      type_key_count: typeKeyCount.toString(),
      miss_type_count: missTypeCount.toString(),
      accuracy: accuracy.toString(),
      miss_type_key: missTypeKey.toString(),
      kpm: kpm.toString()
    })
  }).catch((err) => {
    console.log(err)
    return null
  })
  if (!data) return null
  return (await data.json()) as string
}
