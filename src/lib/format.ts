/* Small formatting helpers — kept dependency-free. */

export function money(n: number): string {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

export type RatePeriod = "day" | "week";

export function rate(n: number, period: RatePeriod = "day"): string {
  return `${money(n)}/${period}`;
}

export function miles(n: number): string {
  return `${n % 1 === 0 ? n : n.toFixed(1)} mi`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function pluralize(n: number, one: string, many = one + "s"): string {
  return `${n} ${n === 1 ? one : many}`;
}

/** hours-ago number -> "just now" / "3h" / "2d" / "3w" */
export function ago(hours: number): string {
  if (hours < 1) return "just now";
  if (hours < 24) return `${Math.round(hours)}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}

const DATE_FMT: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "short",
  day: "numeric",
};
const TIME_FMT: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
};

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", DATE_FMT);
}

export function formatDateTime(d: Date): string {
  return `${d.toLocaleDateString("en-US", DATE_FMT)}, ${d.toLocaleTimeString(
    "en-US",
    TIME_FMT,
  )}`;
}

/** inclusive day count between two dates */
export function daysBetween(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  return Math.max(1, Math.round(ms / 86_400_000));
}

/** price for a span, charging the cheaper of day/week rates */
export function spanPrice(
  days: number,
  perDay: number,
  perWeek?: number,
): number {
  if (!perWeek) return days * perDay;
  const weeks = Math.floor(days / 7);
  const rem = days % 7;
  return weeks * perWeek + Math.min(rem * perDay, perWeek);
}
