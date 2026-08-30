import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Calcolatore balistico Iron Nest',
  },
  settings: {
    ariaLabel: 'Impostazioni',
    title: 'Impostazioni',
    enableFireTime: 'Abilita ora di impatto / ora di fuoco',
    done: 'Fatto',
  },
  gun: {
    positionButton: 'Posizione del cannone (clicca per modificare)',
    positionTitle: 'Imposta posizione del cannone',
    done: 'Fatto',
  },
  target: {
    panelLabel: 'Posizione del bersaglio',
    impactTimeLabel: 'Ora di impatto sul bersaglio (formato 24 ore)',
  },
  charges: {
    panelLabel: 'Numero di cariche',
  },
  result: {
    panelLabel: 'Risultati',
    distance: 'Distanza (km)',
    azimuth: 'Azimut',
    elevation: 'Elevazione',
    flightTime: 'Tempo di volo (s)',
    fireTime: 'Ora di fuoco',
  },
  queue: {
    load: 'Carica cannone {n} ({count}/5)',
    gunLabel: 'Cannone {n}',
    title: 'Coda cannoni',
    markFired: 'Segna come sparato',
    unmarkFired: 'Rimuovi segno',
    deleteRecord: 'Elimina voce',
    chargeValue: 'Carica {n}',
    azimuthValue: 'Azimut {n}°',
    elevationValue: 'Elevazione {n}',
    fireTimeValue: 'Fuoco {n}',
    impactTimeValue: 'Impatto {n}',
  },
  coordinate: {
    block: 'Blocco',
    row: 'Riga',
    subX: 'Sotto-coordinata X',
    subY: 'Sotto-coordinata Y',
  },
  language: {
    ariaLabel: 'Cambia lingua',
  },
} satisfies MessageSchema
