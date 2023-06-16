import { atom } from 'recoil'

type State = {
  value: 'thema' | 'creating' | 'created' | 'playing' | 'score'
}

const defaultState: State = {
  value: 'thema'
}

export const situationAtom = atom({
  key: 'situation',
  default: defaultState
})
