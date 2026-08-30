import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Calculadora balística Iron Nest',
  },
  settings: {
    ariaLabel: 'Configuración',
    title: 'Configuración',
    enableFireTime: 'Activar hora de impacto / hora de disparo',
    done: 'Listo',
  },
  gun: {
    positionButton: 'Posición del cañón (haz clic para cambiar)',
    positionTitle: 'Definir posición del cañón',
    done: 'Listo',
  },
  target: {
    panelLabel: 'Posición del objetivo',
    impactTimeLabel: 'Hora de impacto del objetivo (formato 24 horas)',
  },
  charges: {
    panelLabel: 'Cantidad de cargas',
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
    unmarkFired: 'Quitar marca de disparo',
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
} satisfies MessageSchema
