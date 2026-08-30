# Iron Nest Ballistics Calculator

[English](../README.md) · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [Українська](README.uk.md) · [日本語](README.ja.md) · [Русский](README.ru.md) · 한국어 · [Čeština](README.cs.md) · [Polski](README.pl.md) · [Italiano](README.it.md) · [Español (Latinoamérica)](README.es-419.md) · [Türkçe](README.tr.md)

Vue 3 + TypeScript + Vite로 제작된 탄도 계산기입니다. 포와 표적 좌표를 기반으로 거리, 방위각, 고각, 비행 시간, 발사 시각을 계산하며, 두 문의 포에 대한 사격 대기열을 관리합니다. UI는 16개 언어를 지원합니다.

## 사용 방법

1. **포 위치 설정**: 화면 상단의 「Gun Position」 버튼을 클릭하고 팝업에서 블록(A–T), 행(1–10), 서브 좌표(X/Y, 0–9)를 선택하여 포의 위치를 설정합니다.
2. **표적 좌표 설정**: 「Target Position」 패널에서 같은 방식으로 표적 좌표를 입력합니다.
3. **장약 수 선택**: 1~6 중에서 장약 값을 선택합니다. 현재 사거리를 초과하는 옵션(장약 하나당 최대 5km 도달)은 자동으로 비활성화되며, 거리 변화로 현재 선택이 사거리를 초과하면 자동으로 유효한 값으로 전환됩니다.
4. **(선택) 표적 명중 시각 설정**: 설정(톱니바퀴 아이콘)을 열고 「Enable impact time / fire time」을 활성화한 다음, 「Target Impact Time」에 표적 명중 시각(24시간제)을 입력하면 결과에서 해당 발사 시각을 역산합니다.
5. **계산 결과 확인**: 「Results」 패널에 실시간으로 다음이 표시됩니다:
   - **Distance**: 포와 표적 사이의 거리(km)
   - **Azimuth**: 방위각
   - **Elevation**: 고각
   - **Flight Time**: 포탄 비행 시간(초, 명중 시각 기능 활성화 필요)
   - **Fire Time**: 발사해야 할 시각(명중 시각 기능 활성화 필요)
6. **사격 대기열에 추가**: 「Load Gun 1」 또는 「Load Gun 2」를 클릭하면 현재 표적 좌표, 장약, 방위각, 고각, (활성화된 경우) 발사/명중 시각이 해당 포의 대기열에 저장됩니다(각 포당 최대 5개). 대기열 패널에서 기록을 발사 완료로 표시하거나 삭제할 수 있습니다.
7. **언어 전환**: 화면 우측 상단의 언어 메뉴를 사용해 인터페이스 언어를 변경할 수 있습니다. 선택 사항은 브라우저에 저장되며 다음에 열 때 기억됩니다.

## 개발 환경 설정

```bash
npm install
npm run dev
```

기타 명령어:

```bash
npm run build      # 타입 검사 후 프로덕션 빌드
npm run preview    # 프로덕션 빌드 미리보기
npm run lint        # 코드 스타일 검사
npm run lint:fix    # 수정 가능한 스타일 문제 자동 수정
npm run format      # Prettier로 포맷 후 lint 문제 수정
```

## 기술 스택

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
