import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from './ui/button';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo & Branding */}
        <a
          href="https://bitcoinsilver.top"
          rel="noopener noreferrer"
        >
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Bitcoin Silver" className="h-10 w-10" />
            <span className="text-xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent">
              Bitcoin Silver
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#wallets" className="text-sm font-medium hover:text-primary transition-colors">
            Wallets
          </a>
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#roadmap" className="text-sm font-medium hover:text-primary transition-colors">
            Roadmap
          </a>
          <a href="#community" className="text-sm font-medium hover:text-primary transition-colors">
            Community
          </a>
          <a
            href="/whitepaper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Whitepaper
          </a>
          <a
            href="https://explorer.bitcoinsilver.top"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
              Explorer
          </a>
          <a
            href="https://trade.nestex.one/spot/BTCS_USDT?ref=FB4BBA1A84F3CD2B0E90536167A74353"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm">
              Invest
            </Button>
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-border text-foreground hover:bg-accent focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95">
          <div className="container py-3 flex flex-col gap-2">
            <a href="#wallets" className="py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Wallets
            </a>
            <a href="#features" className="py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Features
            </a>
            <a href="#roadmap" className="py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Roadmap
            </a>
            <a href="#community" className="py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Community
            </a>
            <a
              href="/whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Whitepaper
            </a>
            <a
              href="https://explorer.bitcoinsilver.top"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2"
              onClick={() => setMobileOpen(false)}
            >
              <Button variant="outline" size="sm">Explorer</Button>
            </a>
            <a
              href="https://trade.nestex.one/spot/BTCS_USDT?ref=FB4BBA1A84F3CD2B0E90536167A74353"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2"
              onClick={() => setMobileOpen(false)}
            >
              <Button variant="outline" size="sm">Invest</Button>
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
};
