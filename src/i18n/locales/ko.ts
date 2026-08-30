import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Iron Nest 탄도 계산기',
  },
  settings: {
    ariaLabel: '설정',
    title: '설정',
    enableFireTime: '목표 착탄 시간／발사 시간 사용',
    done: '완료',
  },
  gun: {
    positionButton: '포 위치 (클릭하여 변경)',
    positionTitle: '포 위치 설정',
    done: '완료',
  },
  target: {
    panelLabel: '목표 위치',
    impactTimeLabel: '목표 착탄 시간 (24시간제)',
  },
  charges: {
    panelLabel: '장약 수',
  },
  result: {
    panelLabel: '계산 결과',
    distance: '거리 (km)',
    azimuth: '방위각',
    elevation: '고각',
    flightTime: '비행 시간 (초)',
    fireTime: '발사 시간',
  },
  queue: {
    load: '포{n} 장전 ({count}/5)',
    gunLabel: '포{n}',
    title: '포 대기열',
    markFired: '발사 완료로 표시',
    unmarkFired: '발사 표시 취소',
    deleteRecord: '기록 삭제',
    chargeValue: '장약 {n}',
    azimuthValue: '방위 {n}°',
    elevationValue: '고각 {n}',
    fireTimeValue: '발사 {n}',
    impactTimeValue: '착탄 {n}',
  },
  coordinate: {
    block: '구역',
    row: '행',
    subX: '보조 좌표 X',
    subY: '보조 좌표 Y',
  },
  language: {
    ariaLabel: '언어 전환',
  },
} satisfies MessageSchema
