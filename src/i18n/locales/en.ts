import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Iron Nest Ballistics Calculator',
  },
  settings: {
    ariaLabel: 'Settings',
    title: 'Settings',
    enableFireTime: 'Enable impact time / fire time',
    done: 'Done',
  },
  gun: {
    positionButton: 'Gun Position (click to change)',
    positionTitle: 'Set Gun Position',
    done: 'Done',
  },
  target: {
    panelLabel: 'Target Position',
    impactTimeLabel: 'Target Impact Time (24-hour)',
  },
  charges: {
    panelLabel: 'Charge Bags',
  },
  result: {
    panelLabel: 'Results',
    distance: 'Distance (km)',
    azimuth: 'Azimuth',
    elevation: 'Elevation',
    flightTime: 'Flight Time (s)',
    fireTime: 'Fire Time',
  },
  queue: {
    load: 'Load Gun {n} ({count}/5)',
    gunLabel: 'Gun {n}',
    title: 'Gun Queue',
    markFired: 'Mark as fired',
    unmarkFired: 'Unmark as fired',
    deleteRecord: 'Delete record',
    chargeValue: 'Charge {n}',
    azimuthValue: 'Azimuth {n}°',
    elevationValue: 'Elevation {n}',
    fireTimeValue: 'Fire {n}',
    impactTimeValue: 'Impact {n}',
  },
  coordinate: {
    block: 'Block',
    row: 'Row',
    subX: 'Sub X',
    subY: 'Sub Y',
  },
  language: {
    ariaLabel: 'Switch language',
  },
} satisfies MessageSchema
