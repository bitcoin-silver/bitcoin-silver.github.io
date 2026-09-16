/**
 * Handelsplätze und Kursportale.
 *
 * Eine Quelle für die Markets-Section, das Header-Dropdown und den Footer —
 * vorher standen dieselben URLs an drei Stellen im Code.
 *
 * `logo` ist optional: liegt unter `public/brands/<datei>` eine Logodatei,
 * wird sie gerendert, sonst das Kürzel aus `mark`. So lassen sich echte
 * Marken-SVGs später einfach nachreichen, ohne Komponenten anzufassen.
 */

export interface MarketEntry {
  name: string;
  /** Handelspaar oder kurze Einordnung. */
  meta: string;
  url: string;
  /**
   * Kürzel für das Monogramm. Explizit statt automatisch aus dem Namen
   * abgeleitet: CoinCodex und CoinCarp ergäben beide "CC".
   */
  mark: string;
  logo?: string;
}

export const EXCHANGES: MarketEntry[] = [
  {
    name: "NonKYC",
    meta: "BTCS / USDC",
    mark: "NK",
    url: "https://nonkyc.io/market/BTCS_USDC?ref=65477593e577cfc144c45844",
  },
  {
    name: "NestEx",
    meta: "BTCS / USDT",
    mark: "NX",
    url: "https://trade.nestex.one/spot/BTCS_USDT?ref=FB4BBA1A84F3CD2B0E90536167A74353",
  },
  {
    name: "Qutrade",
    meta: "BTCS / USDT",
    mark: "QT",
    url: "https://qutrade.io/en/?market=btcs_usdt&ref=52336",
  },
  {
    name: "Qutrade",
    meta: "BTCS / BTC",
    mark: "QT",
    url: "https://qutrade.io/en/?market=btcs_btc&ref=52336",
  },
];

export const TRACKERS: MarketEntry[] = [
  {
    name: "CoinGecko",
    meta: "Price & volume",
    mark: "CG",
    url: "https://www.coingecko.com/en/coins/bitcoin-silver-2",
  },
  {
    name: "LiveCoinWatch",
    meta: "Live charts",
    mark: "LCW",
    url: "https://www.livecoinwatch.com/price/BitcoinSilverv2-____BTCS",
  },
  {
    name: "CoinCodex",
    meta: "Market data",
    mark: "CDX",
    url: "https://coincodex.com/crypto/bitcoin-silver-coin/",
  },
  {
    name: "CoinPaprika",
    meta: "Market data",
    mark: "CP",
    url: "https://coinpaprika.com/coin/btcs-bitcoin-silver1/",
  },
  {
    name: "CoinCarp",
    meta: "Market data",
    mark: "CRP",
    url: "https://www.coincarp.com/currencies/bitcoinsilver-top/",
  },
  {
    name: "MiningPoolStats",
    meta: "Pools & hashrate",
    mark: "MPS",
    url: "https://miningpoolstats.stream/bitcoinsilver",
  },
];
