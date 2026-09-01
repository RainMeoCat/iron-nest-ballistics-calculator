import { SUB_DIVISIONS } from './lib/ballistics'

export const COLUMNS = Array.from({ length: 20 }, (_, i) =>
  String.fromCharCode(65 + i)) // A-T
export const ROWS = Array.from({ length: 10 }, (_, i) => i + 1) // 1-10
export const SUBS = Array.from({ length: SUB_DIVISIONS }, (_, i) => i) // 0-9
export const CHARGE_OPTIONS = Array.from({ length: 6 }, (_, i) => i + 1) // 1-6
