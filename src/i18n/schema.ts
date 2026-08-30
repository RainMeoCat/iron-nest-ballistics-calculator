export interface MessageSchema {
  app: {
    title: string
  }
  settings: {
    ariaLabel: string
    title: string
    enableFireTime: string
    done: string
  }
  gun: {
    positionButton: string
    positionTitle: string
    done: string
  }
  target: {
    panelLabel: string
    impactTimeLabel: string
  }
  charges: {
    panelLabel: string
  }
  result: {
    panelLabel: string
    distance: string
    azimuth: string
    elevation: string
    flightTime: string
    fireTime: string
  }
  queue: {
    load: string
    gunLabel: string
    title: string
    markFired: string
    unmarkFired: string
    deleteRecord: string
    chargeValue: string
    azimuthValue: string
    elevationValue: string
    fireTimeValue: string
    impactTimeValue: string
  }
  coordinate: {
    block: string
    row: string
    subX: string
    subY: string
  }
  language: {
    ariaLabel: string
  }
}
