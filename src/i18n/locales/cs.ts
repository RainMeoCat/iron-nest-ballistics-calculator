import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Balistická kalkulačka Iron Nest',
  },
  settings: {
    ariaLabel: 'Nastavení',
    title: 'Nastavení',
    enableFireTime: 'Povolit čas dopadu / čas výstřelu',
    done: 'Hotovo',
  },
  gun: {
    positionButton: 'Pozice děla (klepnutím změníte)',
    positionTitle: 'Nastavit pozici děla',
    done: 'Hotovo',
  },
  target: {
    panelLabel: 'Pozice cíle',
    impactTimeLabel: 'Čas dopadu na cíl (24hodinový formát)',
  },
  charges: {
    panelLabel: 'Počet nábojů',
  },
  result: {
    panelLabel: 'Výsledky',
    distance: 'Vzdálenost (km)',
    azimuth: 'Azimut',
    elevation: 'Elevace',
    flightTime: 'Doba letu (s)',
    fireTime: 'Čas výstřelu',
  },
  queue: {
    load: 'Nabít dělo {n} ({count}/5)',
    gunLabel: 'Dělo {n}',
    title: 'Fronta děl',
    markFired: 'Označit jako vystřeleno',
    unmarkFired: 'Zrušit označení',
    deleteRecord: 'Smazat záznam',
    chargeValue: 'Náboj {n}',
    azimuthValue: 'Azimut {n}°',
    elevationValue: 'Elevace {n}',
    fireTimeValue: 'Výstřel {n}',
    impactTimeValue: 'Dopad {n}',
  },
  coordinate: {
    block: 'Blok',
    row: 'Řádek',
    subX: 'Podsouřadnice X',
    subY: 'Podsouřadnice Y',
  },
  language: {
    ariaLabel: 'Přepnout jazyk',
  },
} satisfies MessageSchema
