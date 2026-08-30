[English](README.md) · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · Español · [Português (Brasil)](README.pt-BR.md) · [Українська](README.uk.md) · [日本語](README.ja.md) · [Русский](README.ru.md) · [한국어](README.ko.md) · [Čeština](README.cs.md) · [Polski](README.pl.md) · [Italiano](README.it.md) · [Español (Latinoamérica)](README.es-419.md) · [Türkçe](README.tr.md)

# Iron Nest Ballistics Calculator

Una calculadora balística construida con Vue 3 + TypeScript + Vite. Calcula la distancia, el azimut, la elevación, el tiempo de vuelo y la hora de disparo a partir de las coordenadas del cañón y el objetivo, y gestiona una cola de disparo para dos cañones. La interfaz admite 16 idiomas.

## Uso

1. **Establecer la posición del cañón**: haz clic en el botón «Gun Position» en la parte superior de la pantalla y elige el bloque (A–T), la fila (1–10) y las subcoordenadas (X/Y, 0–9) en la ventana emergente.
2. **Establecer las coordenadas del objetivo**: en el panel «Target Position», introduce las coordenadas del objetivo de la misma manera.
3. **Elegir las cargas**: selecciona un valor de carga de 1 a 6. Las opciones que superan el alcance actual (cada carga alcanza como máximo 5 km) se desactivan automáticamente, y la selección cambia a un valor válido si la distancia cambia y lo supera.
4. **(Opcional) Establecer la hora de impacto del objetivo**: abre los ajustes (icono de engranaje) y activa «Enable impact time / fire time», luego introduce la hora de impacto del objetivo (formato de 24 horas) en «Target Impact Time» — el resultado calculará la hora de disparo correspondiente.
5. **Leer los resultados**: el panel «Results» muestra en tiempo real:
   - **Distance**: distancia entre el cañón y el objetivo (km)
   - **Azimuth**: rumbo en grados
   - **Elevation**: ángulo de elevación
   - **Flight Time**: tiempo de vuelo del proyectil en segundos (requiere la hora de impacto activada)
   - **Fire Time**: la hora a la que disparar (requiere la hora de impacto activada)
6. **Añadir a la cola de disparo**: haz clic en «Load Gun 1» o «Load Gun 2» para guardar las coordenadas actuales del objetivo, la carga, el azimut, la elevación y (si está activado) la hora de disparo/impacto en la cola de ese cañón (hasta 5 registros cada uno). En el panel de la cola puedes marcar un registro como disparado o eliminarlo.
7. **Cambiar de idioma**: usa el menú de idioma en la esquina superior derecha para cambiar el idioma de la interfaz; la elección se guarda en el navegador y se recuerda la próxima vez.

## Configuración de desarrollo

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm run build      # Verifica los tipos y compila para producción
npm run preview    # Previsualiza la compilación de producción
npm run lint        # Analiza el código
npm run lint:fix    # Corrige automáticamente problemas de estilo
npm run format      # Formatea con Prettier y corrige problemas de lint
```

## Stack tecnológico

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
