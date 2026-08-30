export interface FireRecord {
  id: number
  targetLabel: string
  charges: number
  azimuth: number
  elevation: number
  impactTime: string | null
  fireTime: string | null
  fired: boolean
}
