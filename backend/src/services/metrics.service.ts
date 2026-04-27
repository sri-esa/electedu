export let totalRequests = 0
export let totalResponseMs = 0

export function incrementMetrics(elapsedTime: number) {
  totalRequests++
  totalResponseMs += elapsedTime
}

export function getAverageResponseTime(): number {
  if (totalRequests === 0) return 0
  return Math.round(totalResponseMs / totalRequests)
}
