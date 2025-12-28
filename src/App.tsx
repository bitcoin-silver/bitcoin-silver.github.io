import { StatsSection } from './components/StatsSection';
import { WalletsSection } from './components/WalletsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { RoadmapSection } from './components/RoadmapSection';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import FundraisingBar from "./components/FundraisingBar";
import { HeroSection } from './components/HeroSection';
import PlayStorePopup from './components/PlayStorePopup';
import { NodeMapSection } from './components/NodeMapSection';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      <FundraisingBar />
      <Header />
      
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Node Map Section */}
        <NodeMapSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Wallets Section */}
        <WalletsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Roadmap Section */}
        <RoadmapSection />

        {/* Community Section */}
        <CommunitySection />

        {/* Footer */}
        <Footer />

        <PlayStorePopup />
      </main>
    </div>
  );
}

export default App;

