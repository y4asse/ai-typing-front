'use client'

import { RecoilRoot } from 'recoil'

const RecoilPrivider = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default RecoilPrivider
