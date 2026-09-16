import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Im Dev laufen die Requests über den Vite-Proxy (siehe vite.config.ts),
// in Produktion direkt gegen den Explorer.
const API_BASE = import.meta.env.DEV ? "" : "https://explorer.bitcoinsilver.top";

const REFRESH_MS = 30_000;

export interface BlockchainStats {
  difficulty: number;
  blockCount: number;
  networkHashrate: number;
  moneySupply: number;
  connectionCount: number;
}

interface BlockchainDataValue {
  stats: BlockchainStats | null;
  loading: boolean;
  error: string | null;
  /** true, sobald mindestens einmal echte Explorer-Daten ankamen. */
  isLiveData: boolean;
  /** Zeitpunkt der letzten erfolgreichen Antwort. */
  updatedAt: Date | null;
}

const BlockchainDataContext = createContext<BlockchainDataValue | null>(null);

const ENDPOINTS = [
  "/api/getdifficulty",
  "/api/getblockcount",
  "/api/getnetworkhashps",
  "/ext/getmoneysupply",
  "/api/getconnectioncount",
] as const;

async function fetchEndpoint(path: string): Promise<number | null> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      mode: "cors",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const value = Number(await response.json());
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

/**
 * Hält die Explorer-Daten für die gesamte Seite.
 *
 * Vorher rief jede Komponente `useBlockchainData()` einzeln auf — Stats,
 * POW-Animation und Tokenomics starteten drei eigene Intervalle, also
 * 15 Requests alle 30 Sekunden statt 5. Jetzt pollt genau ein Provider.
 */
export function BlockchainDataProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<BlockchainDataValue>({
    stats: null,
    loading: true,
    error: null,
    isLiveData: false,
    updatedAt: null,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const [difficulty, blockCount, hashrate, supply, connections] =
        await Promise.all(ENDPOINTS.map(fetchEndpoint));

      if (cancelled) return;

      const hasValidData =
        blockCount !== null || supply !== null || hashrate !== null;

      if (hasValidData) {
        setValue({
          stats: {
            difficulty: difficulty ?? 0,
            blockCount: blockCount ?? 0,
            networkHashrate: hashrate ?? 0,
            moneySupply: supply ?? 0,
            connectionCount: connections ?? 0,
          },
          loading: false,
          error: null,
          isLiveData: true,
          updatedAt: new Date(),
        });
      } else {
        // Keine Platzhalterzahlen erfinden: auf einer Blockchain-Seite
        // sind falsche Blockhöhen schlimmer als ein ehrliches "—".
        setValue((prev) => ({
          ...prev,
          loading: false,
          error: "Live network data is currently unavailable.",
          isLiveData: prev.isLiveData && prev.stats !== null,
        }));
      }
    };

    load();
    const interval = setInterval(load, REFRESH_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <BlockchainDataContext.Provider value={value}>
      {children}
    </BlockchainDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- Provider und zugehöriger Hook gehören in eine Datei
export const useBlockchainData = (): BlockchainDataValue => {
  const context = useContext(BlockchainDataContext);
  if (!context) {
    throw new Error(
      "useBlockchainData must be used inside <BlockchainDataProvider>",
    );
  }
  return context;
};
