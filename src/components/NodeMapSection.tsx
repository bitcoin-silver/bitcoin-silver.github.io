import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { ExternalLink, Globe2, Radio, Timer } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { fadeUp } from "@/lib/motion";

// Im Dev über den Vite-Proxy, weil die API CORS nur für die Produktions-
// domain erlaubt (siehe vite.config.ts).
const PEERS_ENDPOINT = import.meta.env.DEV
  ? "/peers-api/peers"
  : "https://bitcoinsilver.eu/api/peers";

const REFRESH_MS = 60_000;

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
  connection_type?: string;
  synced_blocks?: number;
}

interface PositionedPeer extends Peer {
  lat: number;
  lon: number;
}

const nodeIcon = L.divIcon({
  className: "custom-marker-wrapper",
  html: '<div class="btcs-node-marker"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

/** Zoomt auf die tatsächlich vorhandenen Knoten statt auf die ganze Welt. */
function FitBounds({ peers }: { peers: PositionedPeer[] }) {
  const map = useMap();

  useEffect(() => {
    if (peers.length === 0) return;
    const bounds = L.latLngBounds(peers.map((p) => [p.lat, p.lon]));
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 3 });
    }
  }, [peers, map]);

  return null;
}

/** "/BitcoinSilver:31.1.2/" → "31.1.2" */
function clientVersion(subver?: string): string | null {
  const match = subver?.match(/:([\d.]+)/);
  return match ? match[1] : null;
}

export function NodeMapSection() {
  const [peers, setPeers] = useState<Peer[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchPeers = async () => {
      try {
        const response = await fetch(PEERS_ENDPOINT);
        if (!response.ok) throw new Error("Failed to fetch peers");
        const data = await response.json();
        if (cancelled) return;
        setPeers(data.peers ?? []);
        setError(null);
      } catch {
        if (!cancelled) setError("Node data is currently unavailable.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPeers();
    const interval = setInterval(fetchPeers, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const positioned = useMemo(
    () =>
      (peers ?? []).filter(
        (peer): peer is PositionedPeer =>
          typeof peer.lat === "number" && typeof peer.lon === "number",
      ),
    [peers],
  );

  const summary = useMemo(() => {
    const list = peers ?? [];
    const countries = new Set(
      list.map((p) => p.countryCode).filter(Boolean) as string[],
    );

    // Median statt Mittelwert: ein einzelner Knoten mit 2 s Latenz würde
    // den Durchschnitt sonst komplett verzerren.
    const pings = list
      .map((p) => p.pingtime)
      .filter((p): p is number => typeof p === "number" && p > 0)
      .sort((a, b) => a - b);
    const medianPing = pings.length
      ? pings[Math.floor(pings.length / 2)] * 1000
      : null;

    const versions = new Map<string, number>();
    for (const peer of list) {
      const version = clientVersion(peer.subver);
      if (version) versions.set(version, (versions.get(version) ?? 0) + 1);
    }
    const topVersions = [...versions.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return {
      total: list.length,
      countries: countries.size,
      medianPing,
      topVersions,
    };
  }, [peers]);

  const overlayStats = [
    {
      icon: Radio,
      label: "Connected peers",
      value: summary.total > 0 ? String(summary.total) : "—",
    },
    {
      icon: Globe2,
      label: "Countries",
      value: summary.countries > 0 ? String(summary.countries) : "—",
    },
    {
      icon: Timer,
      label: "Median latency",
      value:
        summary.medianPing !== null
          ? `${summary.medianPing.toFixed(0)} ms`
          : "—",
    },
  ];

  return (
    <section className="hairline-top pb-14 pt-14 md:pb-20 md:pt-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Global network"
          title="No single machine runs Bitcoin Silver"
          description="Every dot is a peer our node is talking to right now. The map refreshes itself every minute."
        />
      </div>

      {/* Randlos über die ganze Fensterbreite — die Karte soll nicht in
          einer Box sitzen, sondern den Bildschirm füllen. */}
      <motion.div {...fadeUp} className="shell-bleed relative">
        <div className="relative h-[30rem] border-y border-border bg-surface-1 md:h-[38rem] xl:h-[44rem]">
          {loading && (
            <div className="absolute inset-0 z-[500] flex items-center justify-center bg-surface-1">
              <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand" />
                <p className="text-sm text-muted-foreground">
                  Locating nodes…
                </p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="absolute inset-0 z-[500] flex items-center justify-center bg-surface-1 px-6">
              <p className="max-w-sm text-center text-sm text-muted-foreground">
                {error}
              </p>
            </div>
          )}

          {!loading && !error && (
            <>
              <MapContainer
                center={[20, 0]}
                zoom={2}
                minZoom={2}
                maxZoom={8}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
                scrollWheelZoom={false}
                worldCopyJump
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=cb1_2a0z_1_e35470dadbd7d72d01f8721b"
                />
                <FitBounds peers={positioned} />
                {positioned.map((peer, index) => (
                  <Marker
                    key={`${peer.addr}-${index}`}
                    position={[peer.lat, peer.lon]}
                    icon={nodeIcon}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="mb-1.5 font-semibold">{peer.addr}</div>
                        <dl className="space-y-0.5 text-xs">
                          <div>Country: {peer.countryCode || "Unknown"}</div>
                          <div>
                            Network:{" "}
                            {peer.network === "ipv6" ? "IPv6" : "IPv4"}
                          </div>
                          <div>
                            Ping:{" "}
                            {peer.pingtime
                              ? `${(peer.pingtime * 1000).toFixed(0)} ms`
                              : "n/a"}
                          </div>
                          <div>Client: {clientVersion(peer.subver) ?? "n/a"}</div>
                          <div>
                            Direction: {peer.inbound ? "Inbound" : "Outbound"}
                          </div>
                          {peer.synced_blocks ? (
                            <div>
                              Synced: {peer.synced_blocks.toLocaleString()}
                            </div>
                          ) : null}
                        </dl>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* Glas-Panel über der Karte. `pointer-events-none` auf dem
                  Container, damit Ziehen und Zoomen darunter weiter geht. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[500] p-4 md:p-6">
                <div className="shell flex flex-wrap items-end justify-between gap-4">
                  <div className="pointer-events-auto flex flex-wrap gap-3">
                    {overlayStats.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={stat.label}
                          className="flex items-center gap-3 rounded-xl border border-border bg-surface-1/80 px-4 py-3 shadow-lift backdrop-blur-md"
                        >
                          <span className="icon-chip h-9 w-9 shrink-0 text-brand">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div>
                            <div className="font-display text-lg font-semibold leading-none tabular text-foreground">
                              {stat.value}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {summary.topVersions.length > 0 && (
                      <div className="hidden items-center gap-3 rounded-xl border border-border bg-surface-1/80 px-4 py-3 shadow-lift backdrop-blur-md lg:flex">
                        <div>
                          <div className="flex items-baseline gap-2">
                            {summary.topVersions.map(([version, count]) => (
                              <span
                                key={version}
                                className="font-display text-sm font-semibold tabular text-foreground"
                              >
                                {version}
                                <span className="ml-1 text-xs font-normal text-muted-foreground">
                                  ×{count}
                                </span>
                              </span>
                            ))}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Client versions
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <a
                    href="https://bitcoinsilver.top/node-map/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-border bg-surface-1/80 px-4 py-3 text-sm font-medium text-muted-foreground shadow-lift backdrop-blur-md transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    Full node map
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
