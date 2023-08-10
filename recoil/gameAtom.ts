import { ModeTypes } from '@/types/mode'
import { atom } from 'recoil'

type State = {
  thema: string
  score: number
  timer: number
  text: string[]
  hiragana: string[]
  mode: ModeTypes
  totalTypeNum: number
  totalMissTypeNum: number
  typeNum: number
  missTypeNum: number
  id: string
  missTypeKey: string[]
  totalTimeMiliSec: number
}

export const defaultState: State = {
  thema: '',
  score: 0,
  timer: 0,
  text: [],
  hiragana: [],
  mode: 'standard',
  totalTypeNum: 0,
  totalMissTypeNum: 0,
  typeNum: 0,
  missTypeNum: 0,
  id: '',
  missTypeKey: [],
  totalTimeMiliSec: 0
}

export const gameAtom = atom({
  key: 'game',
  default: defaultState
})
