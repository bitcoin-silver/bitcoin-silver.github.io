import { useCallback, useRef, type MouseEvent } from "react";

/**
 * Lässt einen Lichtfleck dem Zeiger über ein Element folgen.
 *
 * Die Position landet als `--mx`/`--my` direkt am Element — gezeichnet wird
 * sie von der `.spotlight`-Klasse in index.css. Bewusst ohne State: jedes
 * `mousemove` durch React zu schicken würde die Karte hunderte Male pro
 * Sekunde neu rendern. Der Schreibzugriff läuft gebündelt im nächsten Frame.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const frame = useRef<number | null>(null);

  const onMouseMove = useCallback((event: MouseEvent<T>) => {
    const element = event.currentTarget;
    const { clientX, clientY } = event;

    if (frame.current !== null) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${clientX - rect.left}px`);
      element.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  return { onMouseMove };
}
