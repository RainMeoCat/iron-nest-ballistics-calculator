import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Iron-Nest-Ballistikrechner',
  },
  settings: {
    ariaLabel: 'Einstellungen',
    title: 'Einstellungen',
    enableFireTime: 'Einschlagzeit/Feuerzeit aktivieren',
    done: 'Fertig',
  },
  gun: {
    positionButton: 'Geschützposition (zum Ändern klicken)',
    positionTitle: 'Geschützposition festlegen',
    done: 'Fertig',
  },
  target: {
    panelLabel: 'Zielposition',
    impactTimeLabel: 'Einschlagzeit des Ziels (24-Stunden-Format)',
  },
  charges: {
    panelLabel: 'Treibladungen',
  },
  result: {
    panelLabel: 'Ergebnisse',
    distance: 'Entfernung (km)',
    azimuth: 'Azimut',
    elevation: 'Erhöhung',
    flightTime: 'Flugzeit (s)',
    fireTime: 'Feuerzeit',
  },
  queue: {
    load: 'Geschütz {n} laden ({count}/5)',
    gunLabel: 'Geschütz {n}',
    title: 'Geschützwarteschlange',
    markFired: 'Als abgefeuert markieren',
    unmarkFired: 'Markierung aufheben',
    deleteRecord: 'Eintrag löschen',
    chargeValue: 'Ladung {n}',
    azimuthValue: 'Azimut {n}°',
    elevationValue: 'Erhöhung {n}',
    fireTimeValue: 'Feuer {n}',
    impactTimeValue: 'Einschlag {n}',
  },
  coordinate: {
    block: 'Block',
    row: 'Reihe',
    subX: 'Unterkoordinate X',
    subY: 'Unterkoordinate Y',
  },
  language: {
    ariaLabel: 'Sprache wechseln',
  },
  github: {
    ariaLabel: 'Quellcode auf GitHub ansehen',
  },
} satisfies MessageSchema
