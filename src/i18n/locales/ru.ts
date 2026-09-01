import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Баллистический калькулятор Iron Nest',
  },
  settings: {
    ariaLabel: 'Настройки',
    title: 'Настройки',
    enableFireTime: 'Включить время поражения / время выстрела',
    done: 'Готово',
  },
  gun: {
    positionButton: 'Позиция орудия (нажмите, чтобы изменить)',
    positionTitle: 'Задать позицию орудия',
    done: 'Готово',
  },
  target: {
    panelLabel: 'Позиция цели',
    impactTimeLabel: 'Время поражения цели (24-часовой формат)',
  },
  charges: {
    panelLabel: 'Количество зарядов',
  },
  result: {
    panelLabel: 'Результаты',
    distance: 'Расстояние (км)',
    azimuth: 'Азимут',
    elevation: 'Угол возвышения',
    flightTime: 'Время полёта (с)',
    fireTime: 'Время выстрела',
  },
  queue: {
    load: 'Зарядить орудие {n} ({count}/5)',
    gunLabel: 'Орудие {n}',
    title: 'Очередь орудий',
    markFired: 'Отметить как выполненное',
    unmarkFired: 'Снять отметку',
    deleteRecord: 'Удалить запись',
    chargeValue: 'Заряд {n}',
    azimuthValue: 'Азимут {n}°',
    elevationValue: 'Угол {n}',
    fireTimeValue: 'Выстрел {n}',
    impactTimeValue: 'Поражение {n}',
  },
  coordinate: {
    block: 'Блок',
    row: 'Ряд',
    subX: 'Субкоордината X',
    subY: 'Субкоордината Y',
  },
  language: {
    ariaLabel: 'Сменить язык',
  },
  github: {
    ariaLabel: 'Посмотреть исходный код на GitHub',
  },
} satisfies MessageSchema
