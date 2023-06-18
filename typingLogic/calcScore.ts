export const calcScore = (totalWordNumber: number, totalTimeMSec: number, totalMisstypeNum: number): number => {
  if (totalTimeMSec === 0) {
    totalTimeMSec = 1
  }
  const totalTimeSec = totalTimeMSec / 1000
  const WPM = (totalWordNumber / totalTimeSec) * 60
  const accuracy = 1 - totalMisstypeNum / totalWordNumber
  const score = Math.round(WPM * (accuracy * accuracy * accuracy))
  return score
}
