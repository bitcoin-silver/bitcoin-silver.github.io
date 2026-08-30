import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import type { ButtonProps } from './ui/button';

const MARKETS = [
  { label: 'NONKYC (BTCS/USDC)', href: 'https://nonkyc.io/market/BTCS_USDC?ref=65477593e577cfc144c45844' },
  { label: 'NESTEX (BTCS/USDT)', href: 'https://trade.nestex.one/spot/BTCS_USDT?ref=FB4BBA1A84F3CD2B0E90536167A74353' },
  { label: 'QTRADE (BTCS/USDT)', href: 'https://qutrade.io/en/?market=btcs_usdt&ref=52336' },
  { label: 'QTRADE (BTCS/BTC)', href: 'https://qutrade.io/en/?market=btcs_btc&ref=52336' },
];

interface MarketDropdownProps {
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  className?: string;
}

export const MarketDropdown = ({ size, variant, className }: MarketDropdownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className ?? ''}`}>
      <Button
        size={size}
        variant={variant}
        className="gap-1.5 flex items-center"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Market
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </Button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 right-auto md:left-auto md:right-0 mt-2 w-56 rounded-md border border-border/40 bg-background/95 backdrop-blur shadow-lg z-50 overflow-hidden"
        >
          {MARKETS.map((market) => (
            <a
              key={market.href}
              href={market.href}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="block px-4 py-2 text-sm font-medium hover:bg-accent hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {market.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
