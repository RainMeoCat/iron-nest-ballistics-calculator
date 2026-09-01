const SECONDS_PER_DAY = 86400
const SECONDS_PER_HOUR = 3600
const SECONDS_PER_MINUTE = 60

export function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function timeToSeconds(h: number, m: number, s: number): number {
  return h * SECONDS_PER_HOUR + m * SECONDS_PER_MINUTE + s
}

export function secondsToTime(totalSeconds: number): string {
  const normalized
    = ((totalSeconds % SECONDS_PER_DAY) + SECONDS_PER_DAY) % SECONDS_PER_DAY
  const h = Math.floor(normalized / SECONDS_PER_HOUR)
  const m = Math.floor((normalized % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)
  const s = Math.floor(normalized % SECONDS_PER_MINUTE)
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

export function fireTimeFor(impactSeconds: number, flightTime: number): string {
  return secondsToTime(impactSeconds - flightTime)
}
