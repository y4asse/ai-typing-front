import { atom } from 'recoil'

export const gameAtom = atom({
  key: 'game',
  default: {
    thema: '',
    score: 0,
    currentCharIndex: 0,
    currentTextIndex: 0,
    timer: 10,
    text: []
  }
})
