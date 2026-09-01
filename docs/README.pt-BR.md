# Iron Nest Ballistics Calculator

[English](../README.md) · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · Português (Brasil) · [Українська](README.uk.md) · [日本語](README.ja.md) · [Русский](README.ru.md) · [한국어](README.ko.md) · [Čeština](README.cs.md) · [Polski](README.pl.md) · [Italiano](README.it.md) · [Español (Latinoamérica)](README.es-419.md) · [Türkçe](README.tr.md)

**[Experimente online →](https://rainmeocat.com/projects/iron-nest-ballistics-calculator)**

Uma calculadora balística construída com Vue 3 + TypeScript + Vite. Ela calcula distância, azimute, elevação, tempo de voo e horário de disparo a partir das coordenadas do canhão e do alvo, e gerencia uma fila de disparo para dois canhões. A interface tem suporte a 16 idiomas.

## Uso

1. **Definir a posição do canhão**: clique no botão "Gun Position" no topo da tela e escolha o bloco (A–T), a linha (1–10) e as subcoordenadas (X/Y, 0–9) na janela popup.
2. **Definir as coordenadas do alvo**: no painel "Target Position", informe as coordenadas do alvo da mesma forma.
3. **Escolher a carga**: selecione um valor de carga de 1 a 6. Opções que ultrapassam o alcance atual (cada carga alcança no máximo 5 km) são desativadas automaticamente, e a seleção muda para um valor válido se a distância mudar e ultrapassá-lo.
4. **(Opcional) Definir o horário de impacto do alvo**: abra as configurações (ícone de engrenagem) e ative "Enable impact time / fire time", depois informe o horário de impacto do alvo (formato 24 horas) em "Target Impact Time" — o resultado calculará o horário de disparo correspondente.
5. **Ler os resultados**: o painel "Results" exibe em tempo real:
   - **Distance**: distância entre o canhão e o alvo (km)
   - **Azimuth**: azimute em graus
   - **Elevation**: ângulo de elevação
   - **Flight Time**: tempo de voo do projétil em segundos (requer o horário de impacto ativado)
   - **Fire Time**: o horário para disparar (requer o horário de impacto ativado)
6. **Adicionar à fila de disparo**: clique em "Load Gun 1" ou "Load Gun 2" para salvar as coordenadas atuais do alvo, a carga, o azimute, a elevação e (se ativado) o horário de disparo/impacto na fila daquele canhão (até 5 registros cada). No painel da fila, você pode marcar um registro como disparado ou excluí-lo.
7. **Trocar de idioma**: use o menu de idioma no canto superior direito para mudar o idioma da interface; a escolha é salva no navegador e lembrada na próxima vez.

## Configuração de desenvolvimento

```bash
npm install
npm run dev
```

Outros comandos:

```bash
npm run build      # Verifica os tipos e compila para produção
npm run preview    # Visualiza a build de produção
npm run lint        # Analisa o código
npm run lint:fix    # Corrige automaticamente problemas de estilo
npm run format      # Formata com Prettier e corrige problemas de lint
```

## Stack tecnológica

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
