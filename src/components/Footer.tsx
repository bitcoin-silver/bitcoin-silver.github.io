import { Droplet } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/links";
import { EXCHANGES, TRACKERS } from "@/lib/markets";

const RESOURCES = [
  { name: "Block explorer", url: "https://explorer.bitcoinsilver.top" },
  { name: "Whitepaper (PDF)", url: "/whitepaper.pdf" },
  { name: "GitHub", url: "https://github.com/bitcoin-silver" },
];

const LEGAL_LINKS = [
  { name: "Privacy", url: "/privacy.html" },
  { name: "Terms", url: "/terms.html" },
  { name: "Risk disclosure", url: "/risk-disclosure.html" },
];

const FAUCET_URL = "https://bitcoinsilver.eu/faucet/";

interface LinkColumnProps {
  title: string;
  links: ReadonlyArray<{ name: string; url: string }>;
}

const LinkColumn = ({ title, links }: LinkColumnProps) => (
  <div>
    <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {title}
    </h3>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => (
  <footer className="border-t border-border bg-surface-1/40">
    <div className="shell py-14 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <a href="/" className="inline-flex items-center gap-2.5">
            <img src="/logo.png" alt="" width={36} height={36} className="h-9 w-9" />
            <span className="font-display text-lg font-semibold text-foreground">
              Bitcoin Silver
            </span>
          </a>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Advancing Bitcoin&rsquo;s legacy with faster blocks, a fixed supply
            and community-driven Proof-of-Work.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="icon-chip h-10 w-10 text-muted-foreground transition-colors duration-200 hover:border-brand/40 hover:text-brand"
                >
                  <Icon className="h-[1.125rem] w-[1.125rem]" />
                </a>
              );
            })}
          </div>

          <a
            href={FAUCET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-3.5 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/15"
          >
            <Droplet className="h-4 w-4" aria-hidden="true" />
            Claim free BTCS
          </a>
        </div>

        <LinkColumn
          title="Exchanges"
          links={EXCHANGES.map((e) => ({ name: `${e.name} · ${e.meta}`, url: e.url }))}
        />
        <LinkColumn title="Market tracking" links={TRACKERS} />
        <LinkColumn title="Resources" links={RESOURCES} />
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Bitcoin Silver. Built by the community.
        </p>

        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
          {LEGAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </footer>
);
