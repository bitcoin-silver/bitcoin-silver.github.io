import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export const WalletsSection = () => {
  const iconStyle = {
    backgroundColor: '#222222', // dunkler Hintergrund für Icon
    color: 'white',              // Icon-Farbe
    borderRadius: '0.5rem',      // Abgerundete Ecken
    padding: '0.5rem',           // Abstand zum Rand
    display: 'inline-flex',      // Damit padding sichtbar ist
    alignItems: 'center',        // Zentriert vertikal
    justifyContent: 'center',    // Zentriert horizontal
  };

  const wallets = [
    {
      name: 'Mobile Wallet (Google Play)',
      description: 'Manage your BTCS anywhere with the official Android wallet from Google Play.',
      icon: (
        <div style={iconStyle}>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 2h10a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1zM12 19a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        </div>
      ),
      url: 'https://play.google.com/store/apps/details?id=top.bitcoinsilver.wallet2025',
      platform: 'Android',
      type: 'Mobile',
    },
    {
      name: 'Windows Wallet',
      description: 'Full-featured desktop wallet for Windows with graphical interface',
      icon: (
        <div style={iconStyle}>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
          </svg>
        </div>
      ),
      url: 'https://github.com/bitcoin-silver/core/releases/download/v1.0.2/bitcoinsilver-windows.zip',
      platform: 'Windows',
      type: 'Desktop',
    },
    {
      name: 'Linux Wallet',
      description: 'Full-featured desktop wallet for Linux distributions',
      icon: (
        <div style={iconStyle}>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01.471-1.133 1.044 1.044 0 01.355-.201 1.043 1.043 0 01.5-.078zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm-3.878.617c.168.075.393.222.629.401-.12.065-.227.2-.275.33-.074.195-.045.33.106.534.19.265.547.398.761.465.22.067.334.135.334.135a.3.3 0 01.104.068v.003c.055.06.106.128.106.267 0 .138-.073.335-.21.401-.12.074-.252.067-.334.067a.8.8 0 01-.321-.465c-.033-.135-.09-.202-.214-.333l-.003-.003c-.133-.135-.36-.2-.66-.333a2.33 2.33 0 00-.79-.135h-.003c-.219 0-.393.045-.528.135-.135.09-.25.224-.399.498-.1.135-.195.2-.295.2-.1 0-.188-.065-.259-.2a.271.271 0 01-.039-.135c0-.06.023-.12.056-.135.033-.015.045-.045.078-.045.1 0 .134.045.202.132.068.09.2.135.335.135a.584.584 0 00.4-.2c.1-.135.134-.335.134-.6 0-.467-.176-.934-.528-1.334a2.543 2.543 0 00-.662-.534c-.199-.135-.333-.2-.465-.2-.135 0-.259.065-.334.2a.8.8 0 00-.135.4c0 .135.045.267.135.4.09.135.224.267.4.334.176.067.334.135.467.267.133.135.2.335.2.6 0 .135-.033.267-.1.4-.067.135-.167.267-.334.4-.167.135-.4.2-.667.2a1.615 1.615 0 01-.667-.135 1.616 1.616 0 01-.534-.4 1.093 1.093 0 01-.267-.667c0-.267.1-.534.267-.734.167-.2.4-.334.667-.4.267-.067.534-.067.8 0 .267.067.534.2.734.4.2.2.334.467.4.734.067.267.067.534 0 .8-.067.267-.2.534-.4.734-.2.2-.467.334-.734.4a1.615 1.615 0 01-.8 0 1.615 1.615 0 01-.734-.4 1.093 1.093 0 01-.267-.667c0-.267.1-.534.267-.734.167-.2.4-.334.667-.4.267-.067.534-.067.8 0z" />
          </svg>
        </div>
      ),
      url: 'https://github.com/bitcoin-silver/core/releases/download/v1.0.2/bitcoinsilver-linux.tar.gz',
      platform: 'Linux',
      type: 'Desktop',
    },
    {
      name: 'Web Wallet',
      description: 'Browser-based wallet - access your BTCS from anywhere',
      icon: (
        <div style={iconStyle}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
      ),
      url: 'https://bitcoin-silver.github.io/web-wallet/',
      platform: 'Web',
      type: 'Browser',
    }
  ];

  const node = {
    name: 'Node',
    description: 'Headless daemon for running a full node on the network',
    icon: (
      <div style={iconStyle}>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      </div>
    ),
    url: 'https://github.com/bitcoin-silver/core/archive/refs/tags/v1.0.2.tar.gz',
    platform: 'Linux/Unix',
    type: 'Full Node',
  };

  return (
    <section id="wallets" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Download Wallets
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the wallet that best fits your needs. All wallets support the full Bitcoin Silver blockchain.
          </p>
        </motion.div>

        {/* Wallet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {wallets.map((wallet, index) => (
            <motion.div
              key={wallet.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-gray-400/50 transition-all hover:shadow-lg hover:shadow-gray-500/10 group bg-[#262626] border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-[#222222] text-gray-400">
                      {wallet.icon}
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-700/20 text-gray-300 border border-gray-600">
                      {wallet.type}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-gray-100">{wallet.name}</CardTitle>
                  <CardDescription className="text-gray-400">{wallet.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    asChild
                  >
                    <a href={wallet.url} target="_blank" rel="noopener noreferrer" className="gap-2 text-gray-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {wallet.platform}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full Node Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-gray-400/30 bg-[#262626]">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-lg bg-[#222222] text-gray-400">
                  {node.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl text-gray-100">{node.name}</CardTitle>
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-700/20 text-gray-300 border border-gray-600">
                      Advanced
                    </span>
                  </div>
                  <CardDescription className="text-gray-400 text-base">
                    {node.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1"
                  asChild
                >
                  <a href={node.url} target="_blank" rel="noopener noreferrer" className="gap-2 text-gray-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Node Daemon
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                >
                  <a href="https://github.com/bitcoin-silver/core" target="_blank" rel="noopener noreferrer" className="gap-2 text-gray-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Source
                  </a>
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                💡 Running a full node helps secure and decentralize the Bitcoin Silver network
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
