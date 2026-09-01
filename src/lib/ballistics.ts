/**
 * 彈道計算:全部為無副作用的純函式,不依賴任何 Vue 狀態。
 *
 * 座標系統:地圖以 1km 見方的格子構成,欄以 A 起算的字母標示、列以 1 起算的
 * 數字標示,每格再細分為 10 × 10 的子格 (每個子格 0.1km)。
 * 方位角以 +y (北) 為 0°,順時針遞增。
 */

/** 格線欄位的起始字母 */
const GRID_ORIGIN_COLUMN = 'A'

/** 每個格子邊長 (km) */
const KM_PER_GRID_CELL = 1

/** 每個格子在單一軸向上的子格數 */
export const SUB_DIVISIONS = 10

/** 每級裝藥的最大射程 (km):n 級裝藥最遠可打到 n × 5 km */
export const MAX_RANGE_PER_CHARGE_KM = 5

/** 仰角係數:仰角 = 距離(km) × 12 ÷ 裝藥級數 */
export const ELEVATION_PER_KM_PER_CHARGE = 12

/** 打滿該裝藥最大射程時的飛行時間 (秒),飛行時間與射程佔比成正比 */
export const FLIGHT_TIME_AT_MAX_RANGE_SECONDS = 38

/** 地圖上的格線座標 */
export interface GridCoordinate {
  col: string
  row: number
  subX: number
  subY: number
}

/** 以 km 為單位的平面座標 */
export interface Point {
  x: number
  y: number
}

/** 砲位指向目標的位移向量 (km) */
export interface Offset {
  dx: number
  dy: number
}

/** 單次射擊的完整解算結果 */
export interface FireSolution {
  /** 直線距離 (km) */
  distance: number
  /** 方位角 (度),0° 為正北 */
  azimuth: number
  /** 仰角 */
  elevation: number
  /** 飛行時間 (秒) */
  flightTime: number
}

/** 將格線座標換算為以 km 為單位的平面座標 */
export function toKm({ col, row, subX, subY }: GridCoordinate): Point {
  const colIndex = col.charCodeAt(0) - GRID_ORIGIN_COLUMN.charCodeAt(0)
  return {
    x: (colIndex + subX / SUB_DIVISIONS) * KM_PER_GRID_CELL,
    y: (row - 1 + subY / SUB_DIVISIONS) * KM_PER_GRID_CELL,
  }
}

/** 計算砲位指向目標的位移向量 (km) */
export function offsetKm(gun: GridCoordinate, target: GridCoordinate): Offset {
  const gunPos = toKm(gun)
  const targetPos = toKm(target)
  return { dx: targetPos.x - gunPos.x, dy: targetPos.y - gunPos.y }
}

/** 位移向量的直線距離 (km) */
export function distanceKm({ dx, dy }: Offset): number {
  return Math.sqrt(dx ** 2 + dy ** 2)
}

/** 位移向量的方位角 (度),0° 為正北;距離為 0 時回傳 0 */
export function azimuthDeg({ dx, dy }: Offset): number {
  if (dx === 0 && dy === 0)
    return 0
  return (Math.atan2(dx, dy) * (180 / Math.PI) + 360) % 360
}

/** 指定裝藥級數的最大射程 (km) */
export function maxRangeKm(charges: number): number {
  return charges * MAX_RANGE_PER_CHARGE_KM
}

/** 該裝藥級數是否搆得到指定距離 */
export function isWithinRange(distance: number, charges: number): boolean {
  return distance <= maxRangeKm(charges)
}

/** 指定距離與裝藥級數所需的仰角 */
export function elevationFor(distance: number, charges: number): number {
  return (distance * ELEVATION_PER_KM_PER_CHARGE) / charges
}

/** 指定距離與裝藥級數的飛行時間 (秒) */
export function flightTimeFor(distance: number, charges: number): number {
  return (distance / maxRangeKm(charges)) * FLIGHT_TIME_AT_MAX_RANGE_SECONDS
}

/** 由位移向量與裝藥級數解算出完整射擊諸元 */
export function solveFireSolution(offset: Offset, charges: number): FireSolution {
  const distance = distanceKm(offset)
  return {
    distance,
    azimuth: azimuthDeg(offset),
    elevation: elevationFor(distance, charges),
    flightTime: flightTimeFor(distance, charges),
  }
}
