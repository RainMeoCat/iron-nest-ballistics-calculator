# Iron Nest Ballistics Calculator

[English](../README.md) · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [Українська](README.uk.md) · [日本語](README.ja.md) · [Русский](README.ru.md) · [한국어](README.ko.md) · [Čeština](README.cs.md) · [Polski](README.pl.md) · [Italiano](README.it.md) · [Español (Latinoamérica)](README.es-419.md) · Türkçe

Vue 3 + TypeScript + Vite ile oluşturulmuş bir balistik hesap makinesi. Topun ve hedefin koordinatlarından mesafe, azimut, yükseliş açısı, uçuş süresi ve ateş zamanını hesaplar ve iki top için bir ateş kuyruğu yönetir. Arayüz 16 dili destekler.

## Kullanım

1. **Top konumunu ayarlayın**: Ekranın üstündeki "Gun Position" düğmesine tıklayın ve açılan pencerede blok (A–T), satır (1–10) ve alt koordinatları (X/Y, 0–9) seçerek topun konumunu belirleyin.
2. **Hedef koordinatlarını ayarlayın**: "Target Position" panelinde hedefin koordinatlarını aynı şekilde girin.
3. **Barut torbası (charge) seçin**: 1–6 arasında bir değer seçin. Mevcut menzili aşan seçenekler (her barut torbası en fazla 5 km menzile ulaşır) otomatik olarak devre dışı bırakılır ve mesafe değişip mevcut seçimi aşarsa seçim geçerli bir değere otomatik olarak geçer.
4. **(İsteğe bağlı) Hedef vuruş zamanını ayarlayın**: Ayarları (dişli simgesi) açın ve "Enable impact time / fire time" seçeneğini etkinleştirin, ardından "Target Impact Time" alanına hedefin vuruş zamanını (24 saat formatında) girin — sonuç buna göre ateş zamanını geriye doğru hesaplar.
5. **Sonuçları okuyun**: "Results" paneli canlı olarak şunları gösterir:
   - **Distance**: top ile hedef arasındaki mesafe (km)
   - **Azimuth**: derece cinsinden yön açısı
   - **Elevation**: yükseliş açısı
   - **Flight Time**: mermi uçuş süresi, saniye cinsinden (vuruş zamanının etkin olmasını gerektirir)
   - **Fire Time**: ateş edilmesi gereken zaman (vuruş zamanının etkin olmasını gerektirir)
6. **Ateş kuyruğuna ekleyin**: Mevcut hedef koordinatlarını, barutu, azimutu, yükseliş açısını ve (etkinse) ateş/vuruş zamanını o topun kuyruğuna kaydetmek için "Load Gun 1" veya "Load Gun 2" düğmesine tıklayın (her biri için en fazla 5 kayıt). Kuyruk panelinde bir kaydı ateşlendi olarak işaretleyebilir veya silebilirsiniz.
7. **Dili değiştirin**: Arayüz dilini değiştirmek için sağ üst köşedeki dil menüsünü kullanın; seçim tarayıcıda saklanır ve bir sonraki açılışta hatırlanır.

## Geliştirme ortamı kurulumu

```bash
npm install
npm run dev
```

Diğer komutlar:

```bash
npm run build      # Tür denetimi yapar ve üretim için derler
npm run preview    # Üretim derlemesini önizler
npm run lint        # Kod stilini denetler
npm run lint:fix    # Düzeltilebilir stil sorunlarını otomatik düzeltir
npm run format      # Prettier ile biçimlendirir ve lint sorunlarını düzeltir
```

## Teknoloji yığını

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
