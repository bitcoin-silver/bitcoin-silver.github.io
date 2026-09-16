import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessagesSquare, Megaphone, CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { SectionHeading } from "./SectionHeading";
import { DiscordIcon } from "./icons/social";
import { SOCIAL_LINKS } from "@/lib/links";
import { fadeUp, fadeUpStagger } from "@/lib/motion";

const HIGHLIGHTS = [
  {
    title: "Active members",
    description:
      "Holders, miners and builders trading notes across Telegram, Discord and X.",
    icon: MessagesSquare,
  },
  {
    title: "Topic channels",
    description:
      "Separate rooms for mining, wallets, development and market talk.",
    icon: Megaphone,
  },
  {
    title: "Events & AMAs",
    description:
      "Regular calls with the team — ask about the roadmap directly.",
    icon: CalendarDays,
  },
];

const DISCORD_WIDGET_SRC =
  "https://discord.com/widget?id=1539491535651999815&theme=dark";

export const CommunitySection = () => {
  // Das Discord-Widget lädt von einem Drittanbieter und setzt dort Cookies.
  // Es wird deshalb erst nach ausdrücklichem Klick eingebunden.
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  return (
    <section id="community" className="section hairline-top">
      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              layout="stack"
              eyebrow="Community"
              title="Connect, share, build"
              description="Bitcoin Silver is run by the people using it. Join the conversation, help test releases, or just follow along."
              className="mb-10 md:mb-10"
            />

            <ul className="space-y-5">
              {HIGHLIGHTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.title}
                    {...fadeUpStagger(index)}
                    className="flex gap-4"
                  >
                    <span className="icon-chip h-10 w-10 shrink-0 text-brand">
                      <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div {...fadeUp} className="mt-8 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-1 px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-brand/40 hover:text-brand"
                  >
                    <Icon className="h-[1.125rem] w-[1.125rem]" />
                    {social.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          <motion.div {...fadeUp}>
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card edge-light">
              <header className="border-b border-border px-6 py-5">
                <h3 className="font-display text-display-sm text-foreground">
                  Discord
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Live chat and member activity
                </p>
              </header>

              {widgetLoaded ? (
                <iframe
                  src={DISCORD_WIDGET_SRC}
                  title="Bitcoin Silver Discord widget"
                  width="100%"
                  height="480"
                  loading="lazy"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  className="block w-full border-0"
                />
              ) : (
                <div className="flex h-[480px] flex-col items-center justify-center gap-4 px-6 text-center">
                  <span className="icon-chip h-12 w-12 text-brand">
                    <DiscordIcon className="h-6 w-6" />
                  </span>
                  <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                    The Discord widget is loaded from discord.com and sets
                    cookies there. Load it only if you are fine with that.
                  </p>
                  <Button variant="outline" onClick={() => setWidgetLoaded(true)}>
                    Load Discord widget
                  </Button>
                  <a
                    href="https://discord.gg/wCmdJGXFr7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand underline-offset-4 hover:underline"
                  >
                    Or open Discord directly
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
