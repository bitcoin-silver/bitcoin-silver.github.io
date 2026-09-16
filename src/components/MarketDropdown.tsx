import { Dropdown, type DropdownItem } from "./ui/dropdown";
import type { ButtonProps } from "./ui/button";
import { EXCHANGES } from "@/lib/markets";

const ITEMS: DropdownItem[] = EXCHANGES.map((entry) => ({
  label: entry.name,
  meta: entry.meta,
  href: entry.url,
  external: true,
}));

interface MarketDropdownProps {
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
  align?: "start" | "end";
}

export const MarketDropdown = ({
  size,
  variant,
  className,
  align,
}: MarketDropdownProps) => (
  <Dropdown
    label="Buy BTCS"
    items={ITEMS}
    size={size}
    variant={variant}
    className={className}
    align={align}
  />
);
