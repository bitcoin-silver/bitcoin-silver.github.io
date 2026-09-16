import { useEffect, useRef, useState } from "react";

const EASE_OUT_EXPO = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Zählt eine Zahl auf ihren Zielwert hoch.
 *
 * Läuft nur beim ersten echten Wert — spätere Aktualisierungen (die Seite
 * pollt alle 30 s) springen direkt, sonst würde die Blockhöhe alle halbe
 * Minute erneut von null hochlaufen.
 *
 * `prefers-reduced-motion` schaltet die Animation komplett ab.
 */
export function useCountUp(target: number, durationMs = 1100): number {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(target) || target <= 0) {
      setValue(0);
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (hasAnimated.current || prefersReduced) {
      setValue(target);
      return;
    }

    hasAnimated.current = true;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(target * EASE_OUT_EXPO(progress));
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [target, durationMs]);

  return value;
}
