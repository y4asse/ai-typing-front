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
  aiModel: string
  detail: string
  disableRanking: boolean
  rankingCount: number
  rank: number
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
  totalTimeMiliSec: 0,
  aiModel: 'gpt-3.5-turbo',
  detail: 'についての文章',
  disableRanking: false,
  rankingCount: 0,
  rank: 0
}

export const gameAtom = atom({
  key: 'game',
  default: defaultState
})
