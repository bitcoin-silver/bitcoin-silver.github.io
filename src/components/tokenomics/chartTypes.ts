/**
 * Minimale Typen für Recharts-Tooltips.
 *
 * Recharts gibt seinen Tooltip-Komponenten ein sehr breites, generisches
 * Props-Objekt. Statt es mit `any` wegzuwerfen, beschreiben wir hier genau
 * die Felder, die unsere Tooltips tatsächlich lesen.
 */

export interface TooltipEntry<TPayload> {
  value: number;
  payload: TPayload;
}

export interface TooltipProps<TPayload> {
  active?: boolean;
  payload?: TooltipEntry<TPayload>[];
}

/** Punkt der Emissionskurve. */
export interface EmissionPoint {
  year: number;
  totalSupply: number;
  blockHeight: number;
}

/** Ein Halving in der Belohnungskurve. */
export interface HalvingPoint {
  halving: number;
  reward: number;
  blockHeight: number;
  date: string;
  isPast: boolean;
}

/** Props, die Recharts an einen benutzerdefinierten `dot`-Renderer gibt. */
export interface DotRenderProps<TPayload> {
  cx?: number;
  cy?: number;
  payload: TPayload;
}
