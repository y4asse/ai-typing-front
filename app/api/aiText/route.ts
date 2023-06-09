import { NextRequest, NextResponse } from 'next/server'

type AiResponse = {
  text: string[]
  hiragana: string[]
  error?: string
}

type RequestBody = {
  thema: string
}

const testData: AiResponse = {
  text: [
    '人間なんて適当に紙一重なのさ-鋼の錬金術師',
    '夢があるからこそ現実は輝く-BANKAI',
    'なんで人は善い事をするとか正義とかって考えるんだろうその代わり悪い事をするのは簡単だからさ大変な事をして世界を動かすのが正義かもしれない-デスノート',
    '自分を信じることが最後まで戦うこと-NARUTO',
    'まぁいいんじゃないですか人生そんな風に一本筋通ってたら-涼宮ハルヒの憂鬱'
  ],
  hiragana: [
    'にんげんなんててきとうにかみひとえなのさ-はがねのれんきんじゅつし',
    'ゆめがあるからこそげんじつはかがやく-BANKAI',
    'なんでひとはよいことをするとかせいぎとかってかんがえるんだろうそのかわりわるいことをするのはかんたんだからさたいへんなことをしてせかいをうごかすのがせいぎかもしれない-ですのーと',
    'じぶんをしんじることがさいごまでたたかうこと-NARUTO',
    'まぁいいんじゃないですかじんせいそんなふうに一ほんすじとおってたら-すずみやはるひのゆううつ'
  ]
}

const getAiText = async (thema: string): Promise<AiResponse> => {
  const SERVER_URL = process.env.SERVER_URL
  if (!SERVER_URL) {
    throw new Error('環境変数を設定してください')
  }
  const request = new NextRequest(`${SERVER_URL}/aiText`, {
    method: 'POST',
    body: JSON.stringify({ thema }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log('creating text...')
  const data = await fetch(request)
    .then(async (res) => {
      const resBody: AiResponse = await res.json()
      if (!res.ok) {
        throw new Error(`${resBody.error}`)
      }
      //成功したときの処理
      return resBody
    })
    .catch((error: Error) => {
      throw new Error(`${error.message}`)
    })
  return testData
  return data
}

export async function POST(request: Request) {
  const requestBody: RequestBody = await request.json()
  const thema = requestBody.thema
  try {
    if (thema === '') {
      throw new Error('テーマを入力してください')
    }
    const data = await getAiText(thema)
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      return NextResponse.json({ error: `${error.message}` }, { status: 500 })
    }
  }
}

// export async function GET(request: Request) {
//   const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
//   if (!SERVER_URL) {
//     console.log('環境変数が設定されていません')
//     return
//   }
//   return NextResponse.json(data)
// }
