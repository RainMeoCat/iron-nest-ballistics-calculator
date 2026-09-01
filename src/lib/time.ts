/** 時間換算與格式化,全部為純函式 */

const SECONDS_PER_DAY = 86400
const SECONDS_PER_HOUR = 3600
const SECONDS_PER_MINUTE = 60

/** 補足兩位數,例如 7 → "07" */
export function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/** 時分秒換算為當日累計秒數 */
export function timeToSeconds(h: number, m: number, s: number): number {
  return h * SECONDS_PER_HOUR + m * SECONDS_PER_MINUTE + s
}

/** 秒數格式化為 HH:MM:SS,跨日時自動回繞 */
export function secondsToTime(totalSeconds: number): string {
  const normalized
    = ((totalSeconds % SECONDS_PER_DAY) + SECONDS_PER_DAY) % SECONDS_PER_DAY
  const h = Math.floor(normalized / SECONDS_PER_HOUR)
  const m = Math.floor((normalized % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)
  const s = Math.floor(normalized % SECONDS_PER_MINUTE)
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

/** 由命中時間往回推算的發射時間 (HH:MM:SS) */
export function fireTimeFor(impactSeconds: number, flightTime: number): string {
  return secondsToTime(impactSeconds - flightTime)
}
