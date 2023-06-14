import { SingletonRouter } from 'next/router'
import { useState } from 'react'

const MojiExtractor = {
  getRomajiCandidate: (word: string) => [word],
  getHiraganaCandidate: (word: string) => [word]
}

interface Group {
  wordList: string[]
}

const TypingGame = (group: Group) => {
  const [wordList, setWordList] = useState(group.wordList)
  const [curretnWord, setCurrentWord] = useState('')
  const [typedWord, setTypedWord] = useState('')
  const [nextWord, setNextWord] = useState(false)

  const typeWord = (typed: string) => {
    const nextTypedWord = typedWord + typed
    const candidate = MojiExtractor.getHiraganaCandidate(curretnWord)
    //こんにちはがお題で，kを入力
    //some() 配列の中の少なくとも 1 つの要素が 合格するかどうかを判定
    //startWith() 文字列が引数で指定された文字列で始まるかを判定
    if (candidate.some((s) => s.startsWith(nextTypedWord))) {
      //k
      setTypedWord(nextTypedWord)
      const hiragana = MojiExtractor.getHiraganaCandidate(nextTypedWord) //kのひらがな候補[か,き,く,け,こ]を取得

      //[か,き,く,け,こ]に対して，こんにちは，は「か」から始まるか？「き」から始まるか？．．．「こ」から始まるか？yes->こを見つけたのでmatchingHiraganaに代入
      const matchingHiragana = hiragana.find((s) => curretnWord.startsWith(s))

      if (matchingHiragana) {
        //こんにちはを「こ」の文字数分だけ消して「んにちは」にしてremainingHiraganaに入れる
        const remainingHiragana = curretnWord.slice(matchingHiragana.length)
        //currentWordを「んにちは」にする
        setCurrentWord(remainingHiragana)
        setTypedWord('')
        setNextWord(!remainingHiragana)
      }
    }
  }
}

const useTypingLogic = () => {
  return TypingGame
}
export default useTypingLogic
