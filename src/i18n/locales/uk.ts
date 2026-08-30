import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Балістичний калькулятор Iron Nest',
  },
  settings: {
    ariaLabel: 'Налаштування',
    title: 'Налаштування',
    enableFireTime: 'Увімкнути час враження / час пострілу',
    done: 'Готово',
  },
  gun: {
    positionButton: 'Позиція гармати (натисніть, щоб змінити)',
    positionTitle: 'Встановити позицію гармати',
    done: 'Готово',
  },
  target: {
    panelLabel: 'Позиція цілі',
    impactTimeLabel: 'Час враження цілі (24-годинний формат)',
  },
  charges: {
    panelLabel: 'Кількість зарядів',
  },
  result: {
    panelLabel: 'Результати',
    distance: 'Відстань (км)',
    azimuth: 'Азимут',
    elevation: 'Кут піднесення',
    flightTime: 'Час польоту (с)',
    fireTime: 'Час пострілу',
  },
  queue: {
    load: 'Завантажити гармату {n} ({count}/5)',
    gunLabel: 'Гармата {n}',
    title: 'Черга гармат',
    markFired: 'Позначити як здійснено',
    unmarkFired: 'Скасувати позначку',
    deleteRecord: 'Видалити запис',
    chargeValue: 'Заряд {n}',
    azimuthValue: 'Азимут {n}°',
    elevationValue: 'Кут {n}',
    fireTimeValue: 'Постріл {n}',
    impactTimeValue: 'Враження {n}',
  },
  coordinate: {
    block: 'Блок',
    row: 'Рядок',
    subX: 'Підкоордината X',
    subY: 'Підкоордината Y',
  },
  language: {
    ariaLabel: 'Змінити мову',
  },
} satisfies MessageSchema
