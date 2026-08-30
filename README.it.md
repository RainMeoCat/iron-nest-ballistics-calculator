[English](README.md) · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [Українська](README.uk.md) · [日本語](README.ja.md) · [Русский](README.ru.md) · [한국어](README.ko.md) · [Čeština](README.cs.md) · [Polski](README.pl.md) · Italiano · [Español (Latinoamérica)](README.es-419.md) · [Türkçe](README.tr.md)

# Iron Nest Ballistics Calculator

Una calcolatrice balistica costruita con Vue 3 + TypeScript + Vite. Calcola distanza, azimut, elevazione, tempo di volo e orario di apertura del fuoco a partire dalle coordinate del cannone e dell'obiettivo, e gestisce una coda di tiro per due cannoni. L'interfaccia supporta 16 lingue.

## Utilizzo

1. **Imposta la posizione del cannone**: fai clic sul pulsante «Gun Position» in alto nello schermo e scegli il blocco (A–T), la riga (1–10) e le sotto-coordinate (X/Y, 0–9) nella finestra popup.
2. **Imposta le coordinate dell'obiettivo**: nel pannello «Target Position» inserisci le coordinate dell'obiettivo nello stesso modo.
3. **Scegli la carica**: seleziona un valore di carica da 1 a 6. Le opzioni che superano la portata attuale (ogni carica raggiunge al massimo 5 km) vengono disattivate automaticamente e la selezione passa a un valore valido se la distanza cambia e la supera.
4. **(Facoltativo) Imposta l'orario di impatto sull'obiettivo**: apri le impostazioni (icona a ingranaggio) e attiva «Enable impact time / fire time», quindi inserisci l'orario di impatto dell'obiettivo (formato 24 ore) in «Target Impact Time» — il risultato calcolerà a ritroso l'orario di apertura del fuoco corrispondente.
5. **Leggi i risultati**: il pannello «Results» mostra in tempo reale:
   - **Distance**: distanza tra cannone e obiettivo (km)
   - **Azimuth**: rilevamento in gradi
   - **Elevation**: angolo di elevazione
   - **Flight Time**: tempo di volo del proiettile in secondi (richiede l'orario di impatto attivato)
   - **Fire Time**: l'orario in cui aprire il fuoco (richiede l'orario di impatto attivato)
6. **Aggiungi alla coda di tiro**: fai clic su «Load Gun 1» o «Load Gun 2» per salvare le coordinate attuali dell'obiettivo, la carica, l'azimut, l'elevazione e (se attivato) l'orario di tiro/impatto nella coda di quel cannone (fino a 5 voci ciascuna). Nel pannello della coda puoi contrassegnare una voce come sparata o eliminarla.
7. **Cambia lingua**: usa il menu della lingua in alto a destra per cambiare la lingua dell'interfaccia; la scelta viene salvata nel browser e ricordata alla prossima apertura.

## Configurazione dell'ambiente di sviluppo

```bash
npm install
npm run dev
```

Altri comandi:

```bash
npm run build      # Verifica i tipi e compila per la produzione
npm run preview    # Anteprima della build di produzione
npm run lint        # Analizza il codice
npm run lint:fix    # Corregge automaticamente i problemi di stile risolvibili
npm run format      # Formatta con Prettier e corregge i problemi di lint
```

## Stack tecnologico

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
