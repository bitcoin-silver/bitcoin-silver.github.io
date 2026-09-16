import { cn } from "@/lib/utils";

interface BrandMarkProps {
  /** Kürzel, das im Monogramm steht (z.B. "CG", "LCW"). */
  mark: string;
  /** Dateiname unter `public/brands/`. Fehlt er, greift das Monogramm. */
  logo?: string;
  className?: string;
}

/**
 * Markenzeichen für Börsen und Kursportale.
 *
 * Fremde Logos sind hier bewusst nicht einkopiert: Hotlinking auf fremde
 * CDNs bricht irgendwann, schickt jeden Besucher zu einem Dritten und ist
 * markenrechtlich heikler als ein eigenes Zeichen. Das Monogramm ist der
 * Standardfall — sobald echte SVGs unter `public/brands/` liegen und in
 * `src/lib/markets.ts` eingetragen sind, werden sie stattdessen gerendert.
 */
export const BrandMark = ({ mark, logo, className }: BrandMarkProps) => {
  if (logo) {
    return (
      <span
        className={cn(
          "icon-chip shrink-0 overflow-hidden bg-surface-2 p-2",
          className,
        )}
      >
        <img
          src={`/brands/${logo}`}
          alt=""
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "icon-chip shrink-0 bg-gradient-to-br from-surface-3 to-surface-2",
        className,
      )}
    >
      {/* Längere Kürzel rücken enger zusammen, damit sie in die Kachel passen */}
      <span
        className={cn(
          "text-silver font-display font-bold",
          mark.length > 2 ? "text-[0.6875rem] tracking-tight" : "text-sm",
        )}
      >
        {mark}
      </span>
    </span>
  );
};
