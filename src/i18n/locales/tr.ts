import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Iron Nest Balistik Hesaplayıcı',
  },
  settings: {
    ariaLabel: 'Ayarlar',
    title: 'Ayarlar',
    enableFireTime: 'Vuruş zamanı / atış zamanını etkinleştir',
    done: 'Tamam',
  },
  gun: {
    positionButton: 'Top konumu (değiştirmek için tıklayın)',
    positionTitle: 'Top konumunu ayarla',
    done: 'Tamam',
  },
  target: {
    panelLabel: 'Hedef konumu',
    impactTimeLabel: 'Hedef vuruş zamanı (24 saat formatı)',
  },
  charges: {
    panelLabel: 'Barut torbası sayısı',
  },
  result: {
    panelLabel: 'Sonuçlar',
    distance: 'Mesafe (km)',
    azimuth: 'Azimut',
    elevation: 'Yükseliş açısı',
    flightTime: 'Uçuş süresi (sn)',
    fireTime: 'Atış zamanı',
  },
  queue: {
    load: 'Top {n} yükle ({count}/5)',
    gunLabel: 'Top {n}',
    title: 'Top kuyruğu',
    markFired: 'Atıldı olarak işaretle',
    unmarkFired: 'İşareti kaldır',
    deleteRecord: 'Kaydı sil',
    chargeValue: 'Barut {n}',
    azimuthValue: 'Azimut {n}°',
    elevationValue: 'Yükseliş {n}',
    fireTimeValue: 'Atış {n}',
    impactTimeValue: 'Vuruş {n}',
  },
  coordinate: {
    block: 'Blok',
    row: 'Satır',
    subX: 'Alt koordinat X',
    subY: 'Alt koordinat Y',
  },
  language: {
    ariaLabel: 'Dili değiştir',
  },
  github: {
    ariaLabel: 'GitHub\'da kaynak kodunu görüntüle',
  },
} satisfies MessageSchema
