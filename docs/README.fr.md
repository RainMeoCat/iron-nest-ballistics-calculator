# Iron Nest Ballistics Calculator

[English](../README.md) · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · Français · [Deutsch](README.de.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [Українська](README.uk.md) · [日本語](README.ja.md) · [Русский](README.ru.md) · [한국어](README.ko.md) · [Čeština](README.cs.md) · [Polski](README.pl.md) · [Italiano](README.it.md) · [Español (Latinoamérica)](README.es-419.md) · [Türkçe](README.tr.md)

**[Essayer en ligne →](https://rainmeocat.com/projects/iron-nest-ballistics-calculator)**

Une calculatrice balistique construite avec Vue 3 + TypeScript + Vite. Elle calcule la distance, l'azimut, l'élévation, le temps de vol et l'heure de tir à partir des coordonnées du canon et de la cible, et gère une file d'attente de tir pour deux canons. L'interface prend en charge 16 langues.

## Utilisation

1. **Définir la position du canon** : cliquez sur le bouton « Gun Position » en haut de l'écran, puis choisissez le bloc (A–T), la ligne (1–10) et les sous-coordonnées (X/Y, 0–9) dans la fenêtre contextuelle.
2. **Définir les coordonnées de la cible** : dans le panneau « Target Position », entrez les coordonnées de la cible de la même manière.
3. **Choisir les charges** : sélectionnez une valeur de charge de 1 à 6. Les options dépassant la portée actuelle (chaque charge atteint au maximum 5 km) sont automatiquement désactivées, et la sélection bascule vers une valeur valide si la distance change et la dépasse.
4. **(Facultatif) Définir l'heure d'impact de la cible** : ouvrez les paramètres (icône d'engrenage) et activez « Enable impact time / fire time », puis entrez l'heure d'impact de la cible (format 24 heures) sous « Target Impact Time » — le résultat recalculera l'heure de tir correspondante.
5. **Lire les résultats** : le panneau « Results » affiche en direct :
   - **Distance** : distance entre le canon et la cible (km)
   - **Azimuth** : relèvement en degrés
   - **Elevation** : angle d'élévation
   - **Flight Time** : temps de vol du projectile en secondes (nécessite l'heure d'impact activée)
   - **Fire Time** : l'heure à laquelle tirer (nécessite l'heure d'impact activée)
6. **Ajouter à la file de tir** : cliquez sur « Load Gun 1 » ou « Load Gun 2 » pour enregistrer les coordonnées actuelles de la cible, la charge, l'azimut, l'élévation et (si activé) l'heure de tir/impact dans la file de ce canon (jusqu'à 5 enregistrements chacun). Dans le panneau de file, vous pouvez marquer un enregistrement comme tiré ou le supprimer.
7. **Changer de langue** : utilisez le menu de langue en haut à droite pour changer la langue de l'interface ; le choix est enregistré dans le navigateur et mémorisé la prochaine fois.

## Configuration de développement

```bash
npm install
npm run dev
```

Autres commandes :

```bash
npm run build      # Vérifie les types et compile pour la production
npm run preview    # Prévisualise la version de production
npm run lint        # Analyse le code
npm run lint:fix    # Corrige automatiquement les problèmes de style
npm run format      # Formate avec Prettier et corrige les problèmes de lint
```

## Stack technique

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
