# Iron Nest Ballistics Calculator

[English](../README.md) · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · Deutsch · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [Українська](README.uk.md) · [日本語](README.ja.md) · [Русский](README.ru.md) · [한국어](README.ko.md) · [Čeština](README.cs.md) · [Polski](README.pl.md) · [Italiano](README.it.md) · [Español (Latinoamérica)](README.es-419.md) · [Türkçe](README.tr.md)

**[Live ausprobieren →](https://rainmeocat.com/projects/iron-nest-ballistics-calculator)**

Ein mit Vue 3 + TypeScript + Vite entwickelter Ballistikrechner. Er berechnet Entfernung, Azimut, Elevation, Flugzeit und Feuerzeit anhand der Koordinaten von Geschütz und Ziel und verwaltet eine Feuerwarteschlange für zwei Geschütze. Die Benutzeroberfläche unterstützt 16 Sprachen.

## Verwendung

1. **Geschützposition festlegen**: Klicken Sie oben auf die Schaltfläche „Gun Position" und wählen Sie im Popup den Block (A–T), die Zeile (1–10) und die Unterkoordinaten (X/Y, 0–9), um die Position des Geschützes festzulegen.
2. **Zielkoordinaten festlegen**: Geben Sie im Bereich „Target Position" die Koordinaten des Ziels auf die gleiche Weise ein.
3. **Kartuschen wählen**: Wählen Sie einen Ladungswert von 1–6. Optionen, die die aktuelle Reichweite überschreiten (jede Kartusche erreicht maximal 5 km), werden automatisch deaktiviert, und die Auswahl wechselt zu einem gültigen Wert, wenn sich die Entfernung ändert und diese überschreitet.
4. **(Optional) Zielaufschlagzeit festlegen**: Öffnen Sie die Einstellungen (Zahnrad-Symbol) und aktivieren Sie „Enable impact time / fire time". Geben Sie dann unter „Target Impact Time" die Aufschlagzeit des Ziels (24-Stunden-Format) ein — das Ergebnis berechnet die entsprechende Feuerzeit zurück.
5. **Ergebnisse ablesen**: Der Bereich „Results" zeigt live an:
   - **Distance**: Entfernung zwischen Geschütz und Ziel (km)
   - **Azimuth**: Peilung in Grad
   - **Elevation**: Erhöhungswinkel
   - **Flight Time**: Flugzeit des Geschosses in Sekunden (erfordert aktivierte Aufschlagzeit)
   - **Fire Time**: der Zeitpunkt, zu dem gefeuert werden soll (erfordert aktivierte Aufschlagzeit)
6. **Zur Feuerwarteschlange hinzufügen**: Klicken Sie auf „Load Gun 1" oder „Load Gun 2", um die aktuellen Zielkoordinaten, die Ladung, den Azimut, die Elevation und (falls aktiviert) die Feuer-/Aufschlagzeit in die Warteschlange dieses Geschützes zu speichern (bis zu 5 Einträge pro Geschütz). Im Warteschlangenbereich können Sie einen Eintrag als abgefeuert markieren oder löschen.
7. **Sprache wechseln**: Verwenden Sie das Sprachmenü oben rechts, um die Oberflächensprache zu ändern; die Auswahl wird im Browser gespeichert und beim nächsten Öffnen wiederhergestellt.

## Entwicklungsumgebung

```bash
npm install
npm run dev
```

Weitere Befehle:

```bash
npm run build      # Typprüfung und Produktions-Build
npm run preview    # Produktions-Build in der Vorschau ansehen
npm run lint        # Code linten
npm run lint:fix    # Lint-Probleme automatisch beheben
npm run format      # Mit Prettier formatieren und Lint-Probleme beheben
```

## Technologie-Stack

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
