const GRID_ORIGIN_COLUMN = 'A'
const KM_PER_GRID_CELL = 1

export const SUB_DIVISIONS = 10
export const MAX_RANGE_PER_CHARGE_KM = 5
export const ELEVATION_PER_KM_PER_CHARGE = 12
export const FLIGHT_TIME_AT_MAX_RANGE_SECONDS = 38

export interface GridCoordinate {
  col: string
  row: number
  subX: number
  subY: number
}

export interface Point {
  x: number
  y: number
}

export interface Offset {
  dx: number
  dy: number
}

export interface FireSolution {
  distance: number
  azimuth: number
  elevation: number
  flightTime: number
}

export function toKm({ col, row, subX, subY }: GridCoordinate): Point {
  const colIndex = col.charCodeAt(0) - GRID_ORIGIN_COLUMN.charCodeAt(0)
  return {
    x: (colIndex + subX / SUB_DIVISIONS) * KM_PER_GRID_CELL,
    y: (row - 1 + subY / SUB_DIVISIONS) * KM_PER_GRID_CELL,
  }
}

export function offsetKm(gun: GridCoordinate, target: GridCoordinate): Offset {
  const gunPos = toKm(gun)
  const targetPos = toKm(target)
  return { dx: targetPos.x - gunPos.x, dy: targetPos.y - gunPos.y }
}

export function distanceKm({ dx, dy }: Offset): number {
  return Math.sqrt(dx ** 2 + dy ** 2)
}

export function azimuthDeg({ dx, dy }: Offset): number {
  if (dx === 0 && dy === 0)
    return 0
  return (Math.atan2(dx, dy) * (180 / Math.PI) + 360) % 360
}

export function maxRangeKm(charges: number): number {
  return charges * MAX_RANGE_PER_CHARGE_KM
}

export function isWithinRange(distance: number, charges: number): boolean {
  return distance <= maxRangeKm(charges)
}

export function elevationFor(distance: number, charges: number): number {
  return (distance * ELEVATION_PER_KM_PER_CHARGE) / charges
}

export function flightTimeFor(distance: number, charges: number): number {
  return (distance / maxRangeKm(charges)) * FLIGHT_TIME_AT_MAX_RANGE_SECONDS
}

export function solveFireSolution(offset: Offset, charges: number): FireSolution {
  const distance = distanceKm(offset)
  return {
    distance,
    azimuth: azimuthDeg(offset),
    elevation: elevationFor(distance, charges),
    flightTime: flightTimeFor(distance, charges),
  }
}
