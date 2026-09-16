import {
  DiscordIcon,
  TelegramIcon,
  XIcon,
} from "@/components/icons/social";

/**
 * Social-Kanäle. Liegt hier statt in einer Komponente, damit Footer und
 * Community-Section dieselbe Quelle nutzen, ohne dass eine Komponenten-
 * Datei nebenbei Konstanten exportiert (bricht Fast Refresh im Dev).
 */
export const SOCIAL_LINKS = [
  {
    name: "Telegram",
    url: "https://t.me/official_bitcoinsilver",
    icon: TelegramIcon,
  },
  { name: "Discord", url: "https://discord.gg/wCmdJGXFr7", icon: DiscordIcon },
  { name: "X", url: "https://x.com/Official_BTCS", icon: XIcon },
] as const;
