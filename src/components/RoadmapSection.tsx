import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';

export const RoadmapSection = () => {
  const roadmapItems = [
    {
      year: '2025',
      title: 'Foundation & Launch Phase',
      items: [
        { text: 'Bitcoin Silver Mainnet launched', status: 'completed', date: 'July 18, 2025' },
        { text: 'Core Wallet (Windows & Linux) released', status: 'completed', date: 'August 20, 2025' },
        { text: 'Mobile Wallet released (Android & iOS*)', status: 'completed', date: 'August 15, 2025' },
        { text: 'Community building & exchange listing preparation', status: 'completed', date: 'September 10, 2025' },
        { text: 'Strategic partnerships & ecosystem development', status: 'in-progress' },
        { text: 'Marketing campaigns to increase awareness', status: 'in-progress' },
      ],
    },
    {
      year: '2026',
      title: 'Expansion & Ecosystem Growth',
      items: [
        { text: 'Launch P2P Exchange* & Mobile Wallet enhancements', status: 'planned' },
        { text: 'Integration of decentralized finance (DeFi) applications', status: 'planned' },
        { text: 'Listing on Tier 1 exchanges', status: 'planned' },
        { text: 'Enhanced security audits & protocol improvements', status: 'planned' },
        { text: 'Community governance & improved mechanisms', status: 'planned' },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'in-progress':
        return (
          <svg className="w-5 h-5 text-yellow-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <section id="roadmap" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Development Roadmap
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bitcoin Silver’s journey to building a secure, scalable, and community-driven blockchain ecosystem
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roadmapItems.map((phase, phaseIndex) => (
            <motion.div
              key={phase.year}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: phaseIndex * 0.2 }}
            >
              <Card className="overflow-hidden h-full">
                <div className="bg-primary/10 border-b border-primary/20 p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary">{phase.year}</div>
                    <div>
                      <h3 className="text-2xl font-bold">{phase.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {phase.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: phaseIndex * 0.2 + itemIndex * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                        <div className="flex-1">
                          <p className={`${item.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {item.text}
                          </p>
                          {item.date && (
                            <p className="text-xs text-primary mt-1">{item.date}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
