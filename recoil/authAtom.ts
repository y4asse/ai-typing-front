import { atom } from 'recoil'

type State = {
  uid: string
}

const defaultState: State = {
  uid: ''
}

export const authAtom = atom({
  key: 'auth',
  default: defaultState
})
