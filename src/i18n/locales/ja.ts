import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Iron Nest 弾道計算機',
  },
  settings: {
    ariaLabel: '設定',
    title: '設定',
    enableFireTime: '着弾時刻／発射時刻を有効にする',
    done: '完了',
  },
  gun: {
    positionButton: '砲座位置（クリックで変更）',
    positionTitle: '砲座位置を設定',
    done: '完了',
  },
  target: {
    panelLabel: '目標位置',
    impactTimeLabel: '目標着弾時刻（24時間制）',
  },
  charges: {
    panelLabel: '装薬包数',
  },
  result: {
    panelLabel: '計算結果',
    distance: '距離（km）',
    azimuth: '方位角',
    elevation: '仰角',
    flightTime: '飛行時間（秒）',
    fireTime: '発射時刻',
  },
  queue: {
    load: '砲{n}へ装填（{count}/5）',
    gunLabel: '砲{n}',
    title: '砲列キュー',
    markFired: '発射済みにする',
    unmarkFired: '発射済みを解除',
    deleteRecord: '記録を削除',
    chargeValue: '装薬 {n}',
    azimuthValue: '方位 {n}°',
    elevationValue: '仰角 {n}',
    fireTimeValue: '発射 {n}',
    impactTimeValue: '着弾 {n}',
  },
  coordinate: {
    block: 'ブロック',
    row: '行',
    subX: 'サブ座標 X',
    subY: 'サブ座標 Y',
  },
  language: {
    ariaLabel: '言語を切り替え',
  },
  github: {
    ariaLabel: 'GitHub でソースコードを見る',
  },
} satisfies MessageSchema
