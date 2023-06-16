const calcScore = (totalWordNumber: number, totalTimeSec: number, totalMisstypeNum: number): number => {
  const WPM = (totalWordNumber / totalTimeSec) * 60
  const accuracy = 1 - totalMisstypeNum / totalWordNumber
  const score = WPM * (accuracy ^ 3)
  return score
}
