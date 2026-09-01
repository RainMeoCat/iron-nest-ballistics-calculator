import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Iron Nest 弹道计算器',
  },
  settings: {
    ariaLabel: '设置',
    title: '设置',
    enableFireTime: '启用目标落点时间／开火时间',
    done: '完成',
  },
  gun: {
    positionButton: '火炮位置（点击以变更）',
    positionTitle: '设置火炮位置',
    done: '完成',
  },
  target: {
    panelLabel: '目标位置',
    impactTimeLabel: '目标落点时间（24 小时制）',
  },
  charges: {
    panelLabel: '装药包数',
  },
  result: {
    panelLabel: '计算结果',
    distance: '距离（km）',
    azimuth: '方位角',
    elevation: '仰角',
    flightTime: '飞行时间（秒）',
    fireTime: '开火时间',
  },
  queue: {
    load: '载入火炮{n}（{count}/5）',
    gunLabel: '火炮{n}',
    title: '火炮队列',
    markFired: '标记已开火',
    unmarkFired: '取消已开火',
    deleteRecord: '删除记录',
    chargeValue: '装药 {n}',
    azimuthValue: '方位 {n}°',
    elevationValue: '仰角 {n}',
    fireTimeValue: '开火 {n}',
    impactTimeValue: '落地 {n}',
  },
  coordinate: {
    block: '区块',
    row: '行',
    subX: '子坐标 X',
    subY: '子坐标 Y',
  },
  language: {
    ariaLabel: '切换语言',
  },
  github: {
    ariaLabel: '在 GitHub 上查看源代码',
  },
} satisfies MessageSchema
