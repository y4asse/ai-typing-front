import { NextRequest, NextResponse } from 'next/server'

export const middleware = (req: NextRequest) => {
  const res = NextResponse.next()
  //reqからsessionを取得
  const session = req.cookies.get('next-auth.session-token')?.value
  if (!session && req.nextUrl.pathname.startsWith('/mypage')) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth'
    return NextResponse.redirect(redirectUrl)
  }
  return res
}
