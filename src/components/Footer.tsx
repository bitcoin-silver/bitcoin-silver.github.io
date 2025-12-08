import { motion } from 'framer-motion';

export const Footer = () => {
  const socialLinks = [
    {
      name: 'Telegram',
      url: 'https://t.me/official_bitcoinsilver',
      icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
        </svg>
      ),
    },
    {
      name: 'Discord',
      url: 'https://discord.com/invite/Pbt2R55XBt',
      icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.445.864-.608 1.249a18.27 18.27 0 00-5.489 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C2.068 9.041 1.366 13.58 1.66 18.062a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.033.078.078 0 00.084-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.104 13.107 13.107 0 01-1.882-.9.077.077 0 01-.008-.128c.126-.094.252-.192.373-.29a.074.074 0 01.078-.01c3.937 1.8 8.207 1.8 12.11 0a.074.074 0 01.079.009c.121.099.247.198.374.291a.077.077 0 01-.006.128 12.299 12.299 0 01-1.883.899.077.077 0 00-.04.105c.36.698.772 1.362 1.225 1.993a.078.078 0 00.084.028 19.876 19.876 0 005.995-3.034.079.079 0 00.03-.056c.5-7.19-1.2-11.69-3.63-13.666a.06.06 0 00-.031-.026zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.175 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.175 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/Official_BTCS',
      icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    }
  ];

  const exchanges = [
    { name: 'BitStorage', url: 'https://bitstorage.finance/refcode/f2sv1i' },
    { name: 'NestEx', url: 'https://trade.nestex.one/spot/BTCS_USDT?ref=FB4BBA1A84F3CD2B0E90536167A74353' },
    { name: 'Qutrade', url: 'https://qutrade.io/en/?market=btcs_usdt' },
    { name: 'Exbitron', url: 'https://app.exbitron.com/exchange/?market=BTCS-USDT' },
  ];

  const resources = [
    { name: 'Explorer', url: 'https://explorer.bitcoinsilver.top' },
    { name: 'Miningpoolstats', url: 'https://miningpoolstats.stream/bitcoinsilver' },
    { name: 'Whitepaper', url: '/whitepaper.pdf' },
    { name: 'GitHub', url: 'https://github.com/bitcoin-silver' },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/95 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <a
              href="https://bitcoinsilver.top"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Bitcoin Silver" className="h-10 w-10" />
                <span className="text-xl font-bold">Bitcoin Silver</span>
              </div>
            </a>
            <p className="text-sm text-muted-foreground">
              Advancing Bitcoin’s legacy with faster blocks, fixed supply, and community-driven Proof-of-Work innovation.
            </p>
          </div>

          {/* Exchanges */}
          <div>
            <h3 className="font-semibold mb-4">Exchanges</h3>
            <ul className="space-y-2">
              {exchanges.map((exchange) => (
                <li key={exchange.name}>
                  <a
                    href={exchange.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {exchange.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: '#222222',
                    color: 'white',
                  }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bitcoin Silver. All rights reserved.</p>
          <p className="mt-2">
            Built with ⚡ by the Bitcoin Silver community
          </p>
        </div>
      </div>
    </footer>
  );
};
