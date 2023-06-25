'use client'

import { gameAtom } from "@/recoil/gameAtom"
import { situationAtom } from "@/recoil/situationAtom"
import { NextRequest } from "next/server"
import { useRecoilState } from "recoil"

type AiResponse = {
  text: string[]
  hiragana: string[]
  error?: string
}

const useAitext = () => {
    const [game, setGame] = useRecoilState(gameAtom)
    const [situation, setSituation] = useRecoilState(situationAtom)
    const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL

     const handleClick = async () => {
       try {
         if (game.thema.trim() === '') {
           throw new Error('テーマを入力してください')
         }
         if (game.thema.trim().length > 10) {
           throw new Error('テーマは10文字以内で入力してください')
         }
         if (!API_URL) {
           throw new Error('サーバーエラー: 環境変数が設定されていません')
         }
         const request = new NextRequest(`${API_URL}/aiText`, {
           method: 'POST',
           body: JSON.stringify({ thema: game.thema }),
           headers: {
             'Content-Type': 'application/json'
           }
         })
         console.log('creating text...')
         setSituation({ value: 'creating' })
         await fetch(request)
           .then(async (res) => {
             const data: AiResponse = await res.json()
             if (!res.ok) {
               throw new Error(`${data}`)
             }
             //成功したときの処理
             setGame((prev) => {
               return { ...prev, text: data.text, hiragana: data.hiragana, mode: 'standard' }
             })
             setSituation({ value: 'created' })
           })
           .catch((error: Error) => {
             alert(`サーバーエラー: ${error.message}`)
             setSituation({ value: 'thema' })
           })
       } catch (error) {
         if (error instanceof Error) {
           alert(error.message)
         }
       }
     }

     return {handleClick}
}

export default useAitext