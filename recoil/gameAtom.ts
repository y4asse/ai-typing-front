import { ModeTypes } from '@/types/mode'
import { atom } from 'recoil'

type State = {
  thema: string
  score: number
  timer: number
  text: string[]
  hiragana: string[]
  mode: ModeTypes
}

const defaultState: State = {
  thema: '',
  score: 0,
  timer: 10,
  text: [],
  hiragana: [],
  mode: 'standard'
}

export const gameAtom = atom({
  key: 'game',
  default: defaultState
})
