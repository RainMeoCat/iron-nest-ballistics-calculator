# Iron Nest Ballistics Calculator

[English](../README.md) · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [Українська](README.uk.md) · [日本語](README.ja.md) · [Русский](README.ru.md) · [한국어](README.ko.md) · Čeština · [Polski](README.pl.md) · [Italiano](README.it.md) · [Español (Latinoamérica)](README.es-419.md) · [Türkçe](README.tr.md)

Balistická kalkulačka postavená na Vue 3 + TypeScript + Vite. Počítá vzdálenost, azimut, elevaci, dobu letu a čas výstřelu na základě souřadnic děla a cíle a spravuje frontu palby pro dvě děla. Rozhraní podporuje 16 jazyků.

## Použití

1. **Nastavte pozici děla**: klikněte na tlačítko „Gun Position" v horní části obrazovky a v překryvném okně vyberte blok (A–T), řádek (1–10) a dílčí souřadnice (X/Y, 0–9), čímž nastavíte polohu děla.
2. **Nastavte souřadnice cíle**: v panelu „Target Position" zadejte souřadnice cíle stejným způsobem.
3. **Vyberte nálož**: zvolte hodnotu nálože od 1 do 6. Možnosti přesahující aktuální dosah (každá nálož dosáhne maximálně 5 km) se automaticky deaktivují a výběr se přepne na platnou hodnotu, pokud se vzdálenost změní a překročí ji.
4. **(Volitelné) Nastavte čas dopadu na cíl**: otevřete nastavení (ikona ozubeného kola) a zapněte „Enable impact time / fire time", poté zadejte čas dopadu na cíl (24hodinový formát) do pole „Target Impact Time" — výsledek zpětně vypočítá odpovídající čas výstřelu.
5. **Přečtěte si výsledky**: panel „Results" zobrazuje v reálném čase:
   - **Distance**: vzdálenost mezi dělem a cílem (km)
   - **Azimuth**: azimut ve stupních
   - **Elevation**: úhel elevace
   - **Flight Time**: doba letu střely v sekundách (vyžaduje zapnutý čas dopadu)
   - **Fire Time**: čas, kdy vystřelit (vyžaduje zapnutý čas dopadu)
6. **Přidat do fronty palby**: klikněte na „Load Gun 1" nebo „Load Gun 2" a uložte aktuální souřadnice cíle, nálož, azimut, elevaci a (pokud je zapnuto) čas výstřelu/dopadu do fronty daného děla (až 5 záznamů na dělo). V panelu fronty můžete záznam označit jako vystřelený nebo jej smazat.
7. **Přepnout jazyk**: pomocí nabídky jazyků v pravém horním rohu změňte jazyk rozhraní; volba se uloží v prohlížeči a zapamatuje se při příštím otevření.

## Nastavení vývojového prostředí

```bash
npm install
npm run dev
```

Další příkazy:

```bash
npm run build      # Kontrola typů a sestavení pro produkci
npm run preview    # Náhled produkčního sestavení
npm run lint        # Kontrola stylu kódu
npm run lint:fix    # Automatická oprava opravitelných problémů se stylem
npm run format      # Formátování pomocí Prettier a oprava problémů s lintem
```

## Technologický stack

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
