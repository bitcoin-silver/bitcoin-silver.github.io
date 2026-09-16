import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Globe, Server, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { SectionHeading } from "./SectionHeading";
import { AppleIcon, GitHubIcon, LinuxIcon, WindowsIcon } from "./icons/platform";
import { fadeUp, fadeUpStagger } from "@/lib/motion";
import { useSpotlight } from "@/lib/useSpotlight";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface WalletEntry {
  name: string;
  description: string;
  icon: IconComponent;
  url: string;
  /** Beschriftung des Buttons — kurz halten, die Kacheln sind schmal. */
  action: string;
  /** Kategorie-Chip oben rechts. */
  type: string;
}

const RELEASE =
  "https://github.com/bitcoin-silver/core/releases/download/version31.1.3";

const WALLETS: WalletEntry[] = [
  {
    name: "Mobile wallet",
    description: "The official Android wallet, straight from Google Play.",
    icon: Smartphone,
    url: "https://play.google.com/store/apps/details?id=top.bitcoinsilver.wallet2025",
    action: "Google Play",
    type: "Android",
  },
  {
    name: "Windows wallet",
    description: "Full desktop wallet with a graphical interface, 64-bit.",
    icon: WindowsIcon,
    url: `${RELEASE}/bitcoinsilver-31.1.3-win64.zip`,
    action: "Download",
    type: "Desktop",
  },
  {
    name: "Web wallet",
    description: "Browser-based — reach your BTCS with nothing to install.",
    icon: Globe,
    url: "https://bitcoinsilver.top/web-wallet/",
    action: "Open",
    type: "Browser",
  },
  {
    name: "Linux wallet",
    description: "Desktop wallet for common distributions, built on glibc.",
    icon: LinuxIcon,
    url: `${RELEASE}/bitcoinsilver-31.1.3-x86_64-linux-gnu.tar.gz`,
    action: "Download",
    type: "x86_64",
  },
  {
    name: "macOS wallet",
    description: "For Apple Silicon Macs — M1 and later.",
    icon: AppleIcon,
    url: `${RELEASE}/bitcoinsilver-31.1.3-arm64-apple-darwin-Qt.dmg`,
    action: "Download",
    type: "Apple Silicon",
  },
  {
    name: "macOS wallet",
    description: "The same desktop wallet, built for Intel-based Macs.",
    icon: AppleIcon,
    url: `${RELEASE}/bitcoinsilver-31.1.3-x86_64-apple-darwin-Qt.dmg`,
    action: "Download",
    type: "Intel",
  },
];

const WalletCard = ({
  wallet,
  index,
}: {
  wallet: WalletEntry;
  index: number;
}) => {
  const spotlight = useSpotlight<HTMLElement>();
  const Icon = wallet.icon;

  return (
    <motion.div {...fadeUpStagger(index)} className="min-w-0">
      <article
        {...spotlight}
        className="spotlight group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-card edge-light transition-colors duration-200 hover:border-line-strong"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="icon-chip h-11 w-11 shrink-0 transition-colors duration-200 group-hover:border-brand/40 group-hover:text-brand">
            <Icon className="h-5 w-5" />
          </span>
          <span className="truncate rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[0.6875rem] font-medium text-muted-foreground">
            {wallet.type}
          </span>
        </div>

        <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
          {wallet.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {wallet.description}
        </p>

        <Button variant="outline" size="sm" className="mt-5 w-full" asChild>
          <a href={wallet.url} target="_blank" rel="noopener noreferrer">
            <Download aria-hidden="true" />
            {wallet.action}
          </a>
        </Button>
      </article>
    </motion.div>
  );
};

export const WalletsSection = () => {
  return (
    <section id="wallets" className="section hairline-top">
      <div className="shell">
        <SectionHeading
          eyebrow="Get started"
          title="Wallets for every platform"
          description="Every wallet talks to the same chain and holds your keys locally. Pick the one that fits how you use BTCS."
        />

        {/* Auf großen Schirmen liegen alle sechs nebeneinander — das liest
            sich als Plattform-Auswahl statt als Kachelwand. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {WALLETS.map((wallet, index) => (
            <WalletCard
              key={`${wallet.name}-${wallet.type}`}
              wallet={wallet}
              index={index}
            />
          ))}
        </div>

        {/* Full node — bewusst breiter und anders gesetzt, damit die
            Kachelreihe nicht einfach weiterläuft. */}
        <motion.div {...fadeUp} className="mt-4">
          <article className="rounded-xl border border-border bg-surface-2/50 p-6 shadow-card edge-light md:p-8 xl:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <span className="icon-chip h-14 w-14 shrink-0 text-brand">
                  <Server className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-display-sm text-foreground">
                      Run a full node
                    </h3>
                    <span className="rounded-full border border-border bg-surface-3 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      Advanced
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    The headless daemon lets you validate every block yourself
                    and helps keep the network decentralized. No wallet UI, just
                    consensus.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a
                    href={`${RELEASE}/bitcoinsilver-31.1.3-x86_64-linux-gnu.tar.gz`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download aria-hidden="true" />
                    Download daemon
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/bitcoin-silver/core"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    View source
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
};
