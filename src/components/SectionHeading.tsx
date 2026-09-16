import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Kleiner Kicker über der Überschrift, z.B. "Network". */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Badge o.Ä. neben dem Kicker (z.B. Live-Status). */
  action?: ReactNode;
  /**
   * `split` (Standard): Titel links, Beschreibung rechts unten — nutzt die
   * Breite und liest sich redaktionell. `stack`: alles untereinander, für
   * schmale Spalten wie die Community-Section.
   */
  layout?: "split" | "stack";
  className?: string;
}

/**
 * Einheitlicher Abschnittskopf.
 *
 * Vorher hatte jede Section ihren eigenen zentrierten Block mit leicht
 * abweichenden Abständen und Schriftgrößen — der Hauptgrund, warum die
 * Seite so gleichförmig wirkte. Zentriert war zusätzlich ein Problem: auf
 * 1600px+ steht die Überschrift dann als schmale Säule in der Mitte und
 * lässt beide Seiten leer.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  description,
  action,
  layout = "split",
  className,
}: SectionHeadingProps) => (
  <motion.div {...fadeUp} className={cn("mb-12 md:mb-16", className)}>
    {(eyebrow || action) && (
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {eyebrow}
          </span>
        )}
        {action}
      </div>
    )}

    {layout === "split" ? (
      <div className="grid gap-x-12 gap-y-5 lg:grid-cols-12 lg:items-end">
        <h2 className="text-display-lg text-foreground lg:col-span-7">
          {title}
        </h2>
        {description && (
          <p className="text-lead text-muted-foreground lg:col-span-5 lg:pb-1.5">
            {description}
          </p>
        )}
      </div>
    ) : (
      <div className="max-w-2xl">
        <h2 className="text-display-lg text-foreground">{title}</h2>
        {description && (
          <p className="mt-4 text-lead text-muted-foreground">{description}</p>
        )}
      </div>
    )}
  </motion.div>
);
