import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Peer {
  addr: string;
  country?: string;
  countryCode?: string;
  lat?: number;
  lon?: number;
  network: string;
  subver?: string;
  pingtime?: number;
  inbound: boolean;
}

interface PeersData {
  peers: Peer[];
  count: number;
}

// Custom silver marker icon
const createSilverIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 12px;
      height: 12px;
      background: linear-gradient(135deg, #c0c0c0 0%, #ffffff 100%);
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(192, 192, 192, 0.6), 0 0 20px rgba(255, 255, 255, 0.4);
      animation: marker-pulse 2s infinite;
    "></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

// Component to auto-fit bounds
function FitBounds({ peers }: { peers: Peer[] }) {
  const map = useMap();

  useEffect(() => {
    if (peers.length > 0) {
      const bounds = L.latLngBounds(
        peers
          .filter(p => p.lat && p.lon)
          .map(p => [p.lat!, p.lon!])
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 3 });
      }
    }
  }, [peers, map]);

  return null;
}

export function NodeMapSection() {
  const [peersData, setPeersData] = useState<PeersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const response = await fetch('https://btcs-vps13.duckdns.org/api/peers');
        if (!response.ok) throw new Error('Failed to fetch peers');
        const data = await response.json();
        setPeersData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load node data');
      } finally {
        setLoading(false);
      }
    };

    fetchPeers();
    const interval = setInterval(fetchPeers, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const validPeers = peersData?.peers.filter(p => p.lat && p.lon) || [];

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Global Network</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl overflow-hidden shadow-xl"
        >
          <div className="relative h-[575px] w-full">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading node data...</p>
                </div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                <div className="text-center text-destructive">
                  <p className="font-medium mb-2">Failed to load map</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
            {!loading && !error && (
              <MapContainer
                center={[20, 0]}
                zoom={2}
                minZoom={2}
                maxZoom={8}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <FitBounds peers={validPeers} />
                {validPeers.map((peer, idx) => (
                  <Marker
                    key={`${peer.addr}-${idx}`}
                    position={[peer.lat!, peer.lon!]}
                    icon={createSilverIcon()}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="font-bold mb-1">{peer.addr}</div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>Country: {peer.countryCode || 'Unknown'}</div>
                          <div>Type: {peer.network === 'ipv6' ? 'IPv6' : 'IPv4'}</div>
                          <div>Ping: {peer.pingtime ? `${(peer.pingtime * 1000).toFixed(0)}ms` : 'N/A'}</div>
                          <div>Version: {peer.subver || 'N/A'}</div>
                          <div>Direction: {peer.inbound ? 'Inbound' : 'Outbound'}</div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-4"
        >
          <a
            href="https://bitcoin-silver.github.io/node-map/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Globe className="h-4 w-4" />
            View Full Node Map
          </a>
        </motion.div>
      </div>
    </section>
  );
}
