/**
 * Zahlenformate für Netzwerk- und Supply-Werte.
 *
 * Lag vorher im Daten-Hook. Dort exportierte eine Datei sowohl eine
 * Komponente als auch Hilfsfunktionen, was Fast Refresh im Dev bricht.
 */

export const formatHashrate = (hashrate: number): string => {
  if (hashrate >= 1e18) return `${(hashrate / 1e18).toFixed(2)} EH/s`;
  if (hashrate >= 1e15) return `${(hashrate / 1e15).toFixed(2)} PH/s`;
  if (hashrate >= 1e12) return `${(hashrate / 1e12).toFixed(2)} TH/s`;
  if (hashrate >= 1e9) return `${(hashrate / 1e9).toFixed(2)} GH/s`;
  if (hashrate >= 1e6) return `${(hashrate / 1e6).toFixed(2)} MH/s`;
  if (hashrate >= 1e3) return `${(hashrate / 1e3).toFixed(2)} KH/s`;
  return `${hashrate.toFixed(2)} H/s`;
};

export const formatCompactUnits = (value: number): string => {
  if (value >= 1e15) return `${(value / 1e15).toFixed(2)} P`;
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)} T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)} G`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)} M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)} K`;
  return value.toFixed(4);
};

export const formatNumber = (num: number): string =>
  new Intl.NumberFormat("en-US").format(num);
