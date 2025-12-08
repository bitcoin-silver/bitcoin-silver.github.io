import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

const socialLinks = [
    {
    name: 'Telegram',
    url: 'https://t.me/official_bitcoinsilver',
    icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
        </svg>
    ),
    color: 'text-cyan-500',
  },
  {
    name: 'Discord',
    url: 'https://discord.com/invite/Pbt2R55XBt',
    icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.445.864-.608 1.249a18.27 18.27 0 00-5.489 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C2.068 9.041 1.366 13.58 1.66 18.062a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.033.078.078 0 00.084-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.104 13.107 13.107 0 01-1.882-.9.077.077 0 01-.008-.128c.126-.094.252-.192.373-.29a.074.074 0 01.078-.01c3.937 1.8 8.207 1.8 12.11 0a.074.074 0 01.079.009c.121.099.247.198.374.291a.077.077 0 01-.006.128 12.299 12.299 0 01-1.883.899.077.077 0 00-.04.105c.36.698.772 1.362 1.225 1.993a.078.078 0 00.084.028 19.876 19.876 0 005.995-3.034.079.079 0 00.03-.056c.5-7.19-1.2-11.69-3.63-13.666a.06.06 0 00-.031-.026zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.175 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.175 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z" />
        </svg>
    ),
    color: 'text-indigo-500',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/Official_BTCS',
    icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
    color: 'text-blue-500',
  },
];

export const CommunitySection = () => {
  const features = [
    {
      title: 'Active Members',
      description: 'Engage with other BTCS enthusiasts across our platforms.',
    },
    {
      title: 'Discussion Channels',
      description: 'Participate in topic-specific channels to share ideas and news.',
    },
    {
      title: 'Events & Meetups',
      description: 'Join online or offline community events to connect with the network.',
    },
  ];

  return (
    <section id="community" className="py-20 bg-muted/30">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-block">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              🌐 Join the Community
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold">
            Bitcoin Silver Community
            <br />
            <span className="text-primary">Connect. Share. Grow.</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Engage with fellow BTCS enthusiasts across Discord, Telegram, and X. Participate in discussions,
            events, and the latest updates.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary h-fit">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex gap-4 mt-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg bg-primary/10 ${social.color} flex items-center justify-center transition-all`}
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right content - Discord Widget */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle>Discord Community</CardTitle>
              <CardDescription>Live chat and member activity</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                src="https://discord.com/widget?id=1260626093967413418&theme=dark"
                width="100%"
                height="500"
                allowTransparency={true}
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="rounded-b-lg"
              ></iframe>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
