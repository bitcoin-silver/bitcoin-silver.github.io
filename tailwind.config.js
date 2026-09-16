/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  // Tailwinds `container` deckelt hart auf Breakpoint-Werte und springt
  // stufig. Wir nutzen eigene Wrapper mit fließendem Rand — siehe
  // `.shell` / `.shell-wide` / `.shell-tight` in index.css.
  corePlugins: { container: false },
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
        display: ["Sora Variable", "Sora", "Inter Variable", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      // Fließende Typo-Skala: skaliert mit dem Viewport, keine Sprünge
      // zwischen Breakpoints und keine manuellen md:text-* Ketten mehr.
      fontSize: {
        "display-2xl": [
          "clamp(2.25rem, 1.35rem + 4.2vw, 5.75rem)",
          { lineHeight: "0.98", letterSpacing: "-0.038em", fontWeight: "700" },
        ],
        "display-xl": [
          "clamp(2.125rem, 1.35rem + 3.3vw, 4.25rem)",
          { lineHeight: "1.04", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(2.125rem, 1.4rem + 3vw, 4.25rem)",
          { lineHeight: "1.06", letterSpacing: "-0.028em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "650" },
        ],
        "display-sm": [
          "clamp(1.25rem, 1.05rem + 0.8vw, 1.625rem)",
          { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        lead: [
          "clamp(1rem, 0.95rem + 0.3vw, 1.175rem)",
          { lineHeight: "1.65" },
        ],
      },

      colors: {
        // Rohe Flächenstufen — direkt ansprechbar, wenn das shadcn-Alias
        // (card/muted/...) semantisch nicht passt.
        surface: {
          0: "hsl(var(--surface-0))",
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-fg))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        line: {
          DEFAULT: "hsl(var(--line))",
          strong: "hsl(var(--line-strong))",
        },

        // shadcn/ui
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 3px)",
        sm: "calc(var(--radius) - 6px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 10px)",
      },

      boxShadow: {
        // Tiefe über gestaffelte Schatten statt eines einzelnen weichen Blurs
        card: "0 1px 2px hsl(220 20% 2% / 0.45), 0 8px 24px -12px hsl(220 20% 2% / 0.7)",
        lift: "0 2px 4px hsl(220 20% 2% / 0.45), 0 18px 40px -16px hsl(220 20% 2% / 0.8)",
        brand: "0 0 0 1px hsl(var(--brand) / 0.35), 0 10px 32px -12px hsl(var(--brand) / 0.45)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        // Wandernder Lichtreflex über Metallflächen
        sheen: {
          "0%": { backgroundPosition: "-120% 0" },
          "100%": { backgroundPosition: "220% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        // Endlos laufendes Band — der Inhalt liegt zweimal nebeneinander,
        // deshalb genügt die halbe Strecke für einen nahtlosen Umlauf.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // Sehr langsam driftende Lichtfelder im Hintergrund
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(4%, -3%, 0) scale(1.08)" },
          "66%": { transform: "translate3d(-3%, 3%, 0) scale(0.96)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        sheen: "sheen 6s linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        marquee: "marquee 42s linear infinite",
        drift: "drift 26s ease-in-out infinite",
      },

      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
