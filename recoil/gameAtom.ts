import { atom } from 'recoil'

type State = {
  thema: string
  score: number
  timer: number
  text: string[]
  hiragana: string[]
  difficulty: 'easy' | 'normal' | 'hard'
}

const defaultState: State = {
  thema: '',
  score: 0,
  timer: 10,
  text: [],
  hiragana: [],
  difficulty: 'easy'
}

export const gameAtom = atom({
  key: 'game',
  default: defaultState
})
