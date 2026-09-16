import type { Transition, Variants } from "framer-motion";

/**
 * Gemeinsame Motion-Presets.
 *
 * Vorher hatte jede Section ihre eigene, leicht abweichende Kopie von
 * `initial / whileInView / viewport` — mit `delay: index * 0.1`, wodurch
 * die sechste Card erst nach einer halben Sekunde erschien. Hier liegt das
 * Timing an einer Stelle, und die Staffelung ist gedeckelt.
 */

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const transition: Transition = {
  duration: 0.5,
  ease: easeOutExpo,
};

/** Standard-Viewport: löst aus, sobald ein Fünftel sichtbar ist. */
export const viewport = { once: true, amount: 0.2 } as const;

/** Grundbewegung: kurzer Weg von unten, nichts fliegt quer über den Schirm. */
export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition,
};

/**
 * Einzug beim Laden statt beim Scrollen (Hero).
 *
 * Bewusst ohne Opacity: Der Hero steht über dem Fold. Startet er bei
 * `opacity: 0` und die Animation läuft nicht an — gedrosselter
 * requestAnimationFrame, ausgesetztes JS, ein Fehler weiter oben im Baum —,
 * dann sieht der Besucher eine leere Seite. Mit reinem Transform ist der
 * Inhalt im schlimmsten Fall um ein paar Pixel verschoben, aber da.
 */
export const riseOnMount = {
  initial: { y: 18 },
  animate: { y: 0 },
  transition,
};

/**
 * Gestaffelte Variante für Grids und Listen.
 * Der Versatz ist bei 6 Elementen gekappt — danach wird nichts langsamer.
 */
export const fadeUpStagger = (index: number) => ({
  ...fadeUp,
  transition: { ...transition, delay: Math.min(index, 6) * 0.06 },
});

/** Container-/Item-Variants, wenn die Staffelung vom Elternteil kommt. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition },
};
