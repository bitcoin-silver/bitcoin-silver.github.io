import { motion } from "framer-motion";
import {
  ShieldCheck,
  Timer,
  Coins,
  Wallet,
  Network,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { fadeUpStagger } from "@/lib/motion";
import { useSpotlight } from "@/lib/useSpotlight";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Kernaussage, bekommt im Bento-Raster die doppelte Breite. */
  lead?: boolean;
}

const FEATURES: Feature[] = [
  {
    title: "Proof-of-Work consensus",
    description:
      "Secured by SHA-256 — the same work-based security model that has kept Bitcoin honest since 2009, tuned for Bitcoin Silver's faster block schedule. No stake, no validators, no permission needed.",
    icon: ShieldCheck,
    lead: true,
  },
  {
    title: "Fixed supply, verifiable",
    description:
      "A hard cap of 21.47 million BTCS, enforced in consensus and halved every 210,000 blocks. The emission curve is fixed in code — the charts below just read it back.",
    icon: Coins,
    lead: true,
  },
  {
    title: "5-minute blocks",
    description:
      "Confirmations arrive faster while difficulty retargeting keeps the chain steady under load.",
    icon: Timer,
  },
  {
    title: "Wallets everywhere",
    description:
      "Android, Windows, macOS, Linux and the browser — same keys, same chain.",
    icon: Wallet,
  },
  {
    title: "Decentralized by design",
    description:
      "No operator, no gatekeeper. Anyone can run a node and verify the chain themselves.",
    icon: Network,
  },
  {
    title: "Open source",
    description:
      "The full codebase is public and auditable, maintained in the open by the community.",
    icon: GitBranch,
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => {
  const spotlight = useSpotlight<HTMLElement>();
  const Icon = feature.icon;

  return (
    <motion.div
      {...fadeUpStagger(index)}
      className={cn("min-w-0", feature.lead && "2xl:col-span-2")}
    >
      <article
        {...spotlight}
        className={cn(
          "spotlight group relative h-full overflow-hidden rounded-xl border border-border bg-card shadow-card edge-light transition-colors duration-200 hover:border-line-strong",
          feature.lead ? "p-7 xl:p-9" : "p-7",
        )}
      >
        <span
          className={cn(
            "icon-chip transition-colors duration-200 group-hover:border-brand/40 group-hover:text-brand",
            feature.lead ? "h-14 w-14" : "h-12 w-12",
          )}
        >
          <Icon
            className={feature.lead ? "h-6 w-6" : "h-[1.375rem] w-[1.375rem]"}
            aria-hidden="true"
          />
        </span>

        <h3
          className={cn(
            "mt-6 font-display text-foreground",
            feature.lead ? "text-display-md" : "text-display-sm",
          )}
        >
          {feature.title}
        </h3>
        <p
          className={cn(
            "mt-3 leading-relaxed text-muted-foreground",
            feature.lead ? "max-w-xl text-[0.9375rem]" : "text-sm",
          )}
        >
          {feature.description}
        </p>
      </article>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  return (
    <section id="features" className="section hairline-top">
      <div className="shell">
        <SectionHeading
          eyebrow="Why BTCS"
          title="Built for the next generation of digital money"
          description="Bitcoin Silver refines the original Bitcoin design — faster and more accessible, without giving up the decentralization that made it work."
        />

        {/* Bento: die beiden Kernaussagen laufen über zwei Spalten, der Rest
            füllt die zweite Reihe. Gleich große Kacheln lesen sich als Liste,
            unterschiedliche als Gewichtung. */}
        <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
