export type Game = {
  id: string
  user_id: string
  score: number
  inputed_thema: string
  created_at: string
  mode_id: number
  total_key_count: number
  total_miss_type: number
  total_time: number
  disable_ranking: boolean
  ai_model: string
  detail: string
}

export type GameHistory = {
  id: string
  score: number
  inputed_thema: string
  created_at: string
  mode_id: number
}
