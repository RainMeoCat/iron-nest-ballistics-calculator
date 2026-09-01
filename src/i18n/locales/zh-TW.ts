import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Iron Nest 彈道計算器',
  },
  settings: {
    ariaLabel: '設定',
    title: '設定',
    enableFireTime: '啟用目標落點時間／開火時間',
    done: '完成',
  },
  gun: {
    positionButton: '火炮位置（點擊以變更）',
    positionTitle: '設定火炮位置',
    done: '完成',
  },
  target: {
    panelLabel: '目標位置',
    impactTimeLabel: '目標落點時間（24 小時制）',
  },
  charges: {
    panelLabel: '裝藥包數',
  },
  result: {
    panelLabel: '計算結果',
    distance: '距離（km）',
    azimuth: '方位角',
    elevation: '仰角',
    flightTime: '飛行時間（秒）',
    fireTime: '開火時間',
  },
  queue: {
    load: '載入火炮{n}（{count}/5）',
    gunLabel: '火炮{n}',
    title: '火炮佇列',
    markFired: '標記已開火',
    unmarkFired: '取消已開火',
    deleteRecord: '刪除紀錄',
    chargeValue: '裝藥 {n}',
    azimuthValue: '方位 {n}°',
    elevationValue: '仰角 {n}',
    fireTimeValue: '開火 {n}',
    impactTimeValue: '落地 {n}',
  },
  coordinate: {
    block: '區塊',
    row: '列',
    subX: '子座標 X',
    subY: '子座標 Y',
  },
  language: {
    ariaLabel: '切換語言',
  },
  github: {
    ariaLabel: '在 GitHub 上檢視原始碼',
  },
} satisfies MessageSchema
