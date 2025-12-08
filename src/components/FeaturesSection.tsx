import { motion } from 'framer-motion';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export const FeaturesSection = () => {
  const features = [
    {
      title: 'Proof-of-Work Consensus',
      description: 'Secured by the SHA-256 algorithm — leveraging Bitcoin’s proven security model with optimized efficiency for Bitcoin Silver.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      status: 'active',
    },
    {
      title: '5-Minute Block Time',
      description: 'Faster confirmations with a 5-minute block target — balancing transaction speed and network security.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      status: 'active',
    },
    {
      title: 'Fixed Supply',
      description: 'A hard cap of 21.47 million BTCS ensures scarcity and long-term store-of-value integrity — true digital silver.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      status: 'active',
    },
    {
      title: 'Wallet Integration',
      description: 'Seamless wallet support for desktop and mobile — enabling secure transactions across Windows, Linux, and Android.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      status: 'active',
    },
    {
      title: 'Decentralized by Design',
      description: 'Bitcoin Silver operates without central control — ensuring censorship resistance and a true peer-to-peer economy.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      status: 'active',
    },
    {
      title: 'Open Source & Community Driven',
      description: 'Transparent, verifiable codebase maintained by a growing community — ensuring continuous innovation and trust.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      status: 'active',
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for the Next Generation of Digital Money
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bitcoin Silver (BTCS) refines the original Bitcoin vision — faster, efficient, and accessible, 
            while preserving the decentralized foundation that made Bitcoin a revolution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-[#222222] text-white">
                      {feature.icon}
                    </div>
                    {feature.status === 'active' && (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                        ✓ Active
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
