[English](README.md) · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [Українська](README.uk.md) · [日本語](README.ja.md) · [Русский](README.ru.md) · [한국어](README.ko.md) · [Čeština](README.cs.md) · Polski · [Italiano](README.it.md) · [Español (Latinoamérica)](README.es-419.md) · [Türkçe](README.tr.md)

# Iron Nest Ballistics Calculator

Kalkulator balistyczny zbudowany w oparciu o Vue 3 + TypeScript + Vite. Oblicza odległość, azymut, kąt podniesienia, czas lotu i czas otwarcia ognia na podstawie współrzędnych działa i celu oraz zarządza kolejką ognia dla dwóch dział. Interfejs obsługuje 16 języków.

## Sposób użycia

1. **Ustaw pozycję działa**: kliknij przycisk „Gun Position" u góry ekranu i w wyskakującym oknie wybierz blok (A–T), wiersz (1–10) oraz współrzędne pomocnicze (X/Y, 0–9), aby ustawić pozycję działa.
2. **Ustaw współrzędne celu**: w panelu „Target Position" wprowadź współrzędne celu w ten sam sposób.
3. **Wybierz ładunek**: wybierz wartość ładunku od 1 do 6. Opcje przekraczające bieżący zasięg (każdy ładunek osiąga maksymalnie 5 km) są automatycznie wyłączane, a wybór przełącza się na prawidłową wartość, jeśli odległość się zmieni i ją przekroczy.
4. **(Opcjonalnie) Ustaw czas trafienia celu**: otwórz ustawienia (ikona koła zębatego) i włącz „Enable impact time / fire time", a następnie wprowadź czas trafienia celu (format 24-godzinny) w polu „Target Impact Time" — wynik obliczy odpowiedni czas otwarcia ognia.
5. **Odczytaj wyniki**: panel „Results" pokazuje na bieżąco:
   - **Distance**: odległość między działem a celem (km)
   - **Azimuth**: azymut w stopniach
   - **Elevation**: kąt podniesienia
   - **Flight Time**: czas lotu pocisku w sekundach (wymaga włączonego czasu trafienia)
   - **Fire Time**: czas, w którym należy oddać strzał (wymaga włączonego czasu trafienia)
6. **Dodaj do kolejki ognia**: kliknij „Load Gun 1" lub „Load Gun 2", aby zapisać bieżące współrzędne celu, ładunek, azymut, kąt podniesienia oraz (jeśli włączono) czas strzału/trafienia w kolejce danego działa (do 5 wpisów na działo). W panelu kolejki możesz oznaczyć wpis jako oddany lub go usunąć.
7. **Zmień język**: użyj menu języka w prawym górnym rogu, aby zmienić język interfejsu; wybór jest zapisywany w przeglądarce i zapamiętywany przy następnym otwarciu.

## Konfiguracja środowiska deweloperskiego

```bash
npm install
npm run dev
```

Inne polecenia:

```bash
npm run build      # Sprawdzanie typów i budowanie wersji produkcyjnej
npm run preview    # Podgląd wersji produkcyjnej
npm run lint        # Sprawdzanie stylu kodu
npm run lint:fix    # Automatyczna naprawa możliwych do naprawienia problemów ze stylem
npm run format      # Formatowanie za pomocą Prettier i naprawa problemów lint
```

## Stos technologiczny

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
