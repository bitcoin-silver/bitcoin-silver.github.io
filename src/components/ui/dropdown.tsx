import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

export interface DropdownItem {
  label: string;
  href: string;
  /** Kurzer Zusatz rechts/unten, z.B. Handelspaar oder Plattform. */
  meta?: string;
  external?: boolean;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
  menuClassName?: string;
  align?: "start" | "end";
}

/**
 * Kleines Menü mit Trigger-Button.
 *
 * Schließt per Klick nach außen, Escape und Auswahl; Escape gibt den Fokus
 * an den Trigger zurück, damit Tastaturnutzer nicht am Seitenanfang landen.
 */
export const Dropdown = ({
  label,
  items,
  size,
  variant = "outline",
  className,
  menuClassName,
  align = "end",
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <Button
        ref={triggerRef}
        size={size}
        variant={variant}
        className="gap-1.5"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </Button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 mt-2 w-64 overflow-hidden rounded-lg border border-border bg-popover/95 p-1 shadow-lift backdrop-blur-md",
            align === "end" ? "right-0" : "left-0",
            menuClassName,
          )}
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-brand"
            >
              <span>{item.label}</span>
              {item.meta && (
                <span className="text-xs font-normal text-muted-foreground">
                  {item.meta}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
