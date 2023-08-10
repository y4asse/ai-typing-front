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
  hiragana: ['あ', 'い', 'う', 'え', 'お']
  // hiragana: [
  //   'にんげんなんててきとうにかみひとえなのさ-はがねのれんきんじゅつし',
  //   'ゆめがあるからこそげんじつはかがやく-BANKAI',
  //   'なんでひとはよいことをするとかせいぎとかってかんがえるんだろうそのかわりわるいことをするのはかんたんだからさたいへんなことをしてせかいをうごかすのがせいぎかもしれない-ですのーと',
  //   'じぶんをしんじることがさいごまでたたかうこと-NARUTO',
  //   'まぁいいんじゃないですかじんせいそんなふうに1ほんすじとおってたら-すずみやはるひのゆううつ'
  // ]
}
export async function POST(request: Request) {
  const requestBody: RequestBody = await request.json()
  const thema = requestBody.thema
  try {
    if (thema === '') {
      throw new Error('テーマを入力してください')
    }
    const data = testData
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      return NextResponse.json({ error: `${error.message}` }, { status: 500 })
    }
  }
}
