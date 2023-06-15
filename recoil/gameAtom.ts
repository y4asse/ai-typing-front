import { atom } from 'recoil'

type State = {
  thema: string
  score: number
  currentCharIndex: number
  currentTextIndex: number
  timer: number
  text: string[]
  hiragana: string[]
}

const defaultState: State = {
  thema: '',
  score: 0,
  currentCharIndex: 0,
  currentTextIndex: 0,
  timer: 10,
  text: [],
  hiragana: ['きゅうきゅうしゃ', 'こんばんは', 'こんにちは']
}

export const gameAtom = atom({
  key: 'game',
  default: defaultState
})
