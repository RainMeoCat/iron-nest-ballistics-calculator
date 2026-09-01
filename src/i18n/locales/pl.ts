import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Kalkulator balistyczny Iron Nest',
  },
  settings: {
    ariaLabel: 'Ustawienia',
    title: 'Ustawienia',
    enableFireTime: 'Włącz czas trafienia / czas wystrzału',
    done: 'Gotowe',
  },
  gun: {
    positionButton: 'Pozycja działa (kliknij, aby zmienić)',
    positionTitle: 'Ustaw pozycję działa',
    done: 'Gotowe',
  },
  target: {
    panelLabel: 'Pozycja celu',
    impactTimeLabel: 'Czas trafienia celu (format 24-godzinny)',
  },
  charges: {
    panelLabel: 'Liczba ładunków',
  },
  result: {
    panelLabel: 'Wyniki',
    distance: 'Odległość (km)',
    azimuth: 'Azymut',
    elevation: 'Elewacja',
    flightTime: 'Czas lotu (s)',
    fireTime: 'Czas wystrzału',
  },
  queue: {
    load: 'Załaduj działo {n} ({count}/5)',
    gunLabel: 'Działo {n}',
    title: 'Kolejka dział',
    markFired: 'Oznacz jako wystrzelone',
    unmarkFired: 'Cofnij oznaczenie',
    deleteRecord: 'Usuń wpis',
    chargeValue: 'Ładunek {n}',
    azimuthValue: 'Azymut {n}°',
    elevationValue: 'Elewacja {n}',
    fireTimeValue: 'Wystrzał {n}',
    impactTimeValue: 'Trafienie {n}',
  },
  coordinate: {
    block: 'Blok',
    row: 'Rząd',
    subX: 'Podwspółrzędna X',
    subY: 'Podwspółrzędna Y',
  },
  language: {
    ariaLabel: 'Zmień język',
  },
  github: {
    ariaLabel: 'Zobacz kod źródłowy na GitHubie',
  },
} satisfies MessageSchema
