# Iron Nest Ballistics Calculator

[English](../README.md) · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [Українська](README.uk.md) · 日本語 · [Русский](README.ru.md) · [한국어](README.ko.md) · [Čeština](README.cs.md) · [Polski](README.pl.md) · [Italiano](README.it.md) · [Español (Latinoamérica)](README.es-419.md) · [Türkçe](README.tr.md)

Vue 3 + TypeScript + Vite で構築された弾道計算ツールです。砲と目標の座標から距離、方位角、仰角、飛翔時間、発射時刻を計算し、2門の砲の射撃キューを管理します。UI は16言語に対応しています。

## 使い方

1. **砲の位置を設定する**: 画面上部の「Gun Position」ボタンをクリックし、ポップアップでブロック（A–T）、行（1–10）、サブ座標（X/Y、0–9）を選んで砲の位置を設定します。
2. **目標座標を設定する**: 「Target Position」パネルで同様に目標の座標を入力します。
3. **装薬数を選択する**: 1〜6の装薬値を選びます。現在の射程を超える選択肢（各装薬は最大5kmまで到達）は自動的に無効化され、距離の変化で選択が射程を超えた場合は有効な値に自動的に切り替わります。
4. **（任意）目標の着弾時刻を設定する**: 設定（歯車アイコン）を開き「Enable impact time / fire time」を有効にすると、「Target Impact Time」に目標の着弾時刻（24時間形式）を入力でき、結果から対応する発射時刻が逆算されます。
5. **計算結果を確認する**: 「Results」パネルにリアルタイムで表示されます：
   - **Distance**: 砲と目標の距離（km）
   - **Azimuth**: 方位角
   - **Elevation**: 仰角
   - **Flight Time**: 砲弾の飛翔時間（秒、着弾時刻機能を有効にする必要があります）
   - **Fire Time**: 発射すべき時刻（着弾時刻機能を有効にする必要があります）
6. **射撃キューに追加する**: 「Load Gun 1」または「Load Gun 2」をクリックすると、現在の目標座標、装薬数、方位角、仰角、（有効な場合）発射/着弾時刻がその砲のキューに保存されます（各砲最大5件）。キューパネルでは記録を発射済みとしてマークしたり、削除したりできます。
7. **言語を切り替える**: 画面右上の言語メニューでインターフェース言語を切り替えられます。選択内容はブラウザに保存され、次回開いたときに記憶されます。

## 開発環境のセットアップ

```bash
npm install
npm run dev
```

その他のコマンド：

```bash
npm run build      # 型チェックして本番用にビルド
npm run preview    # 本番ビルドをプレビュー
npm run lint        # コードスタイルをチェック
npm run lint:fix    # 修正可能なスタイル問題を自動修正
npm run format      # Prettier でフォーマットし lint 問題を修正
```

## 技術スタック

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
