import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Calculadora Balística Iron Nest',
  },
  settings: {
    ariaLabel: 'Configurações',
    title: 'Configurações',
    enableFireTime: 'Ativar horário de impacto / horário de disparo',
    done: 'Concluído',
  },
  gun: {
    positionButton: 'Posição do canhão (toque para alterar)',
    positionTitle: 'Definir posição do canhão',
    done: 'Concluído',
  },
  target: {
    panelLabel: 'Posição do alvo',
    impactTimeLabel: 'Horário de impacto do alvo (formato 24 horas)',
  },
  charges: {
    panelLabel: 'Cargas de propulsão',
  },
  result: {
    panelLabel: 'Resultados',
    distance: 'Distância (km)',
    azimuth: 'Azimute',
    elevation: 'Elevação',
    flightTime: 'Tempo de voo (s)',
    fireTime: 'Horário de disparo',
  },
  queue: {
    load: 'Carregar canhão {n} ({count}/5)',
    gunLabel: 'Canhão {n}',
    title: 'Fila de canhões',
    markFired: 'Marcar como disparado',
    unmarkFired: 'Desmarcar disparo',
    deleteRecord: 'Excluir registro',
    chargeValue: 'Carga {n}',
    azimuthValue: 'Azimute {n}°',
    elevationValue: 'Elevação {n}',
    fireTimeValue: 'Disparo {n}',
    impactTimeValue: 'Impacto {n}',
  },
  coordinate: {
    block: 'Bloco',
    row: 'Linha',
    subX: 'Subcoordenada X',
    subY: 'Subcoordenada Y',
  },
  language: {
    ariaLabel: 'Mudar idioma',
  },
} satisfies MessageSchema
