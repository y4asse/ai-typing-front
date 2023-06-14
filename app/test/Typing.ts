import { getMappingData } from '@/data/data'

const mappingData = getMappingData()

export default class Typing {
  private hiraganaIndex: number
  private romajiIndex: number
  private romajiCharIndex: number
  private matchingCandidates: string[]
  private splitSentence: string[]
  private romajiCandidates: string[][]

  constructor(text: string) {
    this.hiraganaIndex = 0
    this.romajiIndex = 0
    this.romajiCharIndex = 0
    this.matchingCandidates = []
    this.splitSentence = this.constructTypeSentence(text).splitSentence
    this.romajiCandidates = this.constructTypeSentence(text).romajiCandidates
  }

  constructTypeSentence(hiragana: string) {
    const parsedStr: string[] = []
    const judge: string[][] = []
    let i: number = 0
    while (i < hiragana.length) {
      const uni = hiragana[i]
      const bi = i + 1 < hiragana.length ? hiragana[i] + hiragana[i + 1] : ''
      const tri = i + 2 < hiragana.length ? hiragana[i] + hiragana[i + 1] + hiragana[i + 2] : ''
      let validTypeList: string[] = []
      if (mappingData.has(tri)) {
        validTypeList = mappingData.get(tri) as string[]
        i += 3
        parsedStr.push(tri)
      } else if (mappingData.has(bi)) {
        validTypeList = mappingData.get(bi) as string[]
        i += 2
        parsedStr.push(bi)
      } else if (mappingData.has(uni)) {
        validTypeList = mappingData.get(uni) as string[]
        i++
        parsedStr.push(uni)
      } else {
        throw new Error('不明な文字が検出されました')
      }
      judge.push(validTypeList)
    }
    return { splitSentence: parsedStr, romajiCandidates: judge }
  }

  getSplitSentence() {
    return this.splitSentence
  }

  getRomajiCandidates() {
    return this.romajiCandidates
  }

  getRomajiIndex() {
    return this.romajiIndex
  }

  getRomajiCharIndex() {
    return this.romajiCharIndex
  }

  getHiraganaIndex(){
    return this.hiraganaIndex
  }

  getMatchingCandidates () {
    return this.matchingCandidates
  }

  setMatchingCandidates(match: string[]) {
    this.matchingCandidates = match
  }
}
