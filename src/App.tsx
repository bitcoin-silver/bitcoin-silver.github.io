import { Suspense, lazy } from "react";
import { BlockchainDataProvider } from "./hooks/useBlockchainData";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { NetworkTicker } from "./components/NetworkTicker";
import { StatsSection } from "./components/StatsSection";
import { WalletsSection } from "./components/WalletsSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { MarketsSection } from "./components/MarketsSection";
import { RoadmapSection } from "./components/RoadmapSection";
import { CommunitySection } from "./components/CommunitySection";
import { Footer } from "./components/Footer";

// Leaflet und Recharts machten zusammen den Großteil des Hauptbundles aus,
// obwohl beide Sections unter dem Fold liegen. Sie werden jetzt separat
// geladen — der Hero ist dadurch deutlich früher interaktiv.
const NodeMapSection = lazy(() =>
  import("./components/NodeMapSection").then((m) => ({
    default: m.NodeMapSection,
  })),
);
const TokenomicsSection = lazy(() => import("./components/TokenomicsSection"));

/** Platzhalter in der ungefähren Endhöhe, damit nichts nachspringt. */
const SectionFallback = ({ height }: { height: string }) => (
  <div className="section-tight" aria-hidden="true">
    <div className="shell">
      <div
        className="animate-pulse-soft rounded-xl border border-border bg-surface-1"
        style={{ height }}
      />
    </div>
  </div>
);

function App() {
  return (
    <BlockchainDataProvider>
      <div className="min-h-screen bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-foreground"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" className="relative">
          <HeroSection />
          <NetworkTicker />
          <StatsSection />

          <Suspense fallback={<SectionFallback height="30rem" />}>
            <NodeMapSection />
          </Suspense>

          <WalletsSection />
          <FeaturesSection />

          <Suspense fallback={<SectionFallback height="40rem" />}>
            <TokenomicsSection />
          </Suspense>

          <MarketsSection />
          <RoadmapSection />
          <CommunitySection />
        </main>

        <Footer />
      </div>
    </BlockchainDataProvider>
  );
}

export default App;
