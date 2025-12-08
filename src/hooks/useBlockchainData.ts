import { useState, useEffect } from 'react';

// Use relative URLs in development (proxied by Vite), absolute in production
const API_BASE = import.meta.env.DEV ? '' : 'https://explorer.bitcoinsilver.top';

interface BlockchainStats {
  difficulty: number;
  blockCount: number;
  networkHashrate: number;
  moneySupply: number;
  connectionCount: number;
}

export const useBlockchainData = () => {
  const [stats, setStats] = useState<BlockchainStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiveData, setIsLiveData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch data with error handling for each endpoint
        const fetchWithFallback = async (url: string, fallback: any) => {
          try {
            const response = await fetch(url, {
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
              },
            });
            if (!response.ok) {
              console.warn(`Failed to fetch ${url}: ${response.status}`);
              return fallback;
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.warn(`Error fetching ${url}:`, error);
            return fallback;
          }
        };

        const [difficulty, blockCount, hashrate, supply, connections] = await Promise.all([
          fetchWithFallback(`${API_BASE}/api/getdifficulty`, 0),
          fetchWithFallback(`${API_BASE}/api/getblockcount`, 0),
          fetchWithFallback(`${API_BASE}/api/getnetworkhashps`, 0),
          fetchWithFallback(`${API_BASE}/ext/getmoneysupply`, 0),
          fetchWithFallback(`${API_BASE}/api/getconnectioncount`, 0),
        ]);

        console.log('Fetched data:', { difficulty, blockCount, hashrate, supply, connections });

        // Check if we got valid data
        const hasValidData = difficulty || blockCount || hashrate || supply || connections;

        if (hasValidData) {
          setStats({
            difficulty: parseFloat(difficulty) || 0,
            blockCount: parseInt(blockCount) || 0,
            networkHashrate: parseFloat(hashrate) || 0,
            moneySupply: parseFloat(supply) || 0,
            connectionCount: parseInt(connections) || 0,
          });
          setIsLiveData(true);
          setError(null);
        } else {
          // Use demo data if API fails (CORS or network issues)
          console.warn('Using demo data - API may be blocked by CORS');
          setStats({
            difficulty: 0.0234,
            blockCount: 145678,
            networkHashrate: 1234567890, // ~1.23 GH/s
            moneySupply: 8456789.5,
            connectionCount: 42,
          });
          setIsLiveData(false);
          setError(null); // Don't show error, just use demo data
        }
      } catch (err) {
        setError('Failed to fetch blockchain data. CORS may be blocking requests.');
        console.error('Error fetching blockchain data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { stats, loading, error, isLiveData };
};

export const formatHashrate = (hashrate: number): string => {
  if (hashrate >= 1e12) return `${(hashrate / 1e12).toFixed(2)} TH/s`;
  if (hashrate >= 1e9) return `${(hashrate / 1e9).toFixed(2)} GH/s`;
  if (hashrate >= 1e6) return `${(hashrate / 1e6).toFixed(2)} MH/s`;
  if (hashrate >= 1e3) return `${(hashrate / 1e3).toFixed(2)} KH/s`;
  return `${hashrate.toFixed(2)} H/s`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

