import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Calculadora balística Iron Nest',
  },
  settings: {
    ariaLabel: 'Ajustes',
    title: 'Ajustes',
    enableFireTime: 'Activar hora de impacto / hora de disparo',
    done: 'Hecho',
  },
  gun: {
    positionButton: 'Posición del cañón (toca para cambiar)',
    positionTitle: 'Definir posición del cañón',
    done: 'Hecho',
  },
  target: {
    panelLabel: 'Posición del objetivo',
    impactTimeLabel: 'Hora de impacto del objetivo (formato 24 horas)',
  },
  charges: {
    panelLabel: 'Cargas de proyección',
  },
  result: {
    panelLabel: 'Resultados',
    distance: 'Distancia (km)',
    azimuth: 'Azimut',
    elevation: 'Elevación',
    flightTime: 'Tiempo de vuelo (s)',
    fireTime: 'Hora de disparo',
  },
  queue: {
    load: 'Cargar cañón {n} ({count}/5)',
    gunLabel: 'Cañón {n}',
    title: 'Cola de cañones',
    markFired: 'Marcar como disparado',
    unmarkFired: 'Desmarcar disparo',
    deleteRecord: 'Eliminar registro',
    chargeValue: 'Carga {n}',
    azimuthValue: 'Azimut {n}°',
    elevationValue: 'Elevación {n}',
    fireTimeValue: 'Disparo {n}',
    impactTimeValue: 'Impacto {n}',
  },
  coordinate: {
    block: 'Bloque',
    row: 'Fila',
    subX: 'Subcoordenada X',
    subY: 'Subcoordenada Y',
  },
  language: {
    ariaLabel: 'Cambiar idioma',
  },
  github: {
    ariaLabel: 'Ver el código fuente en GitHub',
  },
} satisfies MessageSchema
