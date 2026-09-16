import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dropdown, type DropdownItem } from "./ui/dropdown";
import { MarketDropdown } from "./MarketDropdown";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  { id: "wallets", label: "Wallets" },
  { id: "features", label: "Features" },
  { id: "tokenomics", label: "Tokenomics" },
  { id: "markets", label: "Markets" },
  { id: "roadmap", label: "Roadmap" },
  { id: "community", label: "Community" },
] as const;

const RESOURCES: DropdownItem[] = [
  { label: "Whitepaper", meta: "PDF", href: "/whitepaper.pdf", external: true },
  {
    label: "Block Explorer",
    href: "https://explorer.bitcoinsilver.top",
    external: true,
  },
  {
    label: "Testnet Faucet",
    href: "https://bitcoinsilver.eu/faucet",
    external: true,
  },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Header wird erst beim Scrollen undurchsichtig — über dem Hero
  // soll er nicht als Balken abschneiden. Der Fortschrittswert landet als
  // CSS-Variable am Element, damit die Leiste ohne Re-Render mitläuft.
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      progressRef.current?.style.setProperty(
        "transform",
        `scaleX(${Math.min(Math.max(ratio, 0), 1)})`,
      );
      setScrolled(window.scrollY > 12);

      // Aktive Section: die, die eine gedachte Linie bei 40 % Fensterhöhe
      // schneidet. Wird hier im Scroll-Handler bestimmt statt per
      // IntersectionObserver, weil der seine Ziele einmalig beim Mount
      // einsammelt — und #tokenomics kommt erst nach, sobald der lazy
      // geladene Chunk da ist. Das Element wird deshalb jedes Mal frisch
      // gesucht.
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const { id } of NAV_SECTIONS) {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (rect && rect.top <= line && rect.bottom > line) {
          current = id;
          break;
        }
      }
      setActiveSection((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Hintergrund nicht mitscrollen lassen, solange das Mobilmenü offen ist.
  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled || mobileOpen
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <a
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Bitcoin Silver — home"
        >
          <img
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="whitespace-nowrap font-display text-[1.0625rem] font-semibold tracking-tight text-foreground">
            Bitcoin Silver
          </span>
        </a>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "true" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                activeSection === id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-px h-px bg-brand transition-opacity duration-200",
                  activeSection === id ? "opacity-100" : "opacity-0",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Dropdown
            label="Resources"
            items={RESOURCES}
            variant="ghost"
            size="sm"
          />
          <MarketDropdown size="sm" variant="default" />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <div className="shell flex max-h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto py-4">
            {NAV_SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent"
              >
                {label}
              </a>
            ))}

            <hr className="my-2 border-border" />

            {RESOURCES.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.label}
                {item.meta && (
                  <span className="text-xs font-normal">{item.meta}</span>
                )}
              </a>
            ))}

            <div className="mt-3 flex flex-col gap-2 px-3">
              <MarketDropdown align="start" className="w-full [&>button]:w-full" />
              <Button asChild variant="outline">
                <a
                  href="https://play.google.com/store/apps/details?id=top.bitcoinsilver.wallet2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                >
                  Get the wallet
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lesefortschritt — sitzt auf der unteren Headerkante */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-brand/0 via-brand to-brand/0"
        style={{ transform: "scaleX(0)" }}
      />
    </header>
  );
};
