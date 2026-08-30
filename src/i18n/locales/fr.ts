import type { MessageSchema } from '../schema'

export default {
  app: {
    title: 'Calculateur balistique Iron Nest',
  },
  settings: {
    ariaLabel: 'Paramètres',
    title: 'Paramètres',
    enableFireTime: "Activer l'heure d'impact / l'heure de tir",
    done: 'Terminé',
  },
  gun: {
    positionButton: 'Position du canon (cliquer pour modifier)',
    positionTitle: 'Définir la position du canon',
    done: 'Terminé',
  },
  target: {
    panelLabel: 'Position de la cible',
    impactTimeLabel: "Heure d'impact de la cible (format 24 h)",
  },
  charges: {
    panelLabel: 'Charges propulsives',
  },
  result: {
    panelLabel: 'Résultats',
    distance: 'Distance (km)',
    azimuth: 'Azimut',
    elevation: 'Élévation',
    flightTime: 'Temps de vol (s)',
    fireTime: 'Heure de tir',
  },
  queue: {
    load: 'Charger canon {n} ({count}/5)',
    gunLabel: 'Canon {n}',
    title: 'File des canons',
    markFired: 'Marquer comme tiré',
    unmarkFired: 'Annuler le tir',
    deleteRecord: "Supprimer l'entrée",
    chargeValue: 'Charge {n}',
    azimuthValue: 'Azimut {n}°',
    elevationValue: 'Élévation {n}',
    fireTimeValue: 'Tir {n}',
    impactTimeValue: 'Impact {n}',
  },
  coordinate: {
    block: 'Bloc',
    row: 'Ligne',
    subX: 'Sous-coord. X',
    subY: 'Sous-coord. Y',
  },
  language: {
    ariaLabel: 'Changer de langue',
  },
} satisfies MessageSchema
