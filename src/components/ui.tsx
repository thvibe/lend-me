import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { Icon, type IconName } from "./Icon";
import { initials, money, type RatePeriod } from "../lib/format";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/* ---- Button ------------------------------------------------------------- */
type ButtonVariant = "primary" | "secondary" | "soft" | "ghost" | "danger";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  block?: boolean;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
}
export function Button({
  variant = "primary",
  size = "md",
  block,
  leadingIcon,
  trailingIcon,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "btn",
        `btn--${variant}`,
        size !== "md" && `btn--${size}`,
        block && "btn--block",
        className,
      )}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} size={20} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={20} />}
    </button>
  );
}

/* ---- Icon button -------------------------------------------------------- */
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  variant?: "surface" | "on-brand";
  size?: number;
}
export function IconButton({
  icon,
  label,
  variant,
  size = 22,
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cx("icon-btn", variant && `icon-btn--${variant}`, className)}
      aria-label={label}
      {...rest}
    >
      <Icon name={icon} size={size} />
    </button>
  );
}

/* ---- Chip --------------------------------------------------------------- */
interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  icon?: IconName;
}
export function Chip({ selected, icon, children, className, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      className={cx("chip", className)}
      aria-pressed={selected}
      {...rest}
    >
      {icon && <Icon name={icon} size={18} className="chip__icon" />}
      {children}
    </button>
  );
}

/* ---- Badge -------------------------------------------------------------- */
interface BadgeProps {
  variant?: "primary" | "deposit" | "success" | "warning" | "danger" | "solid";
  icon?: IconName;
  children: ReactNode;
  className?: string;
}
export function Badge({ variant, icon, children, className }: BadgeProps) {
  return (
    <span className={cx("badge", variant && `badge--${variant}`, className)}>
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}

/* ---- Avatar ------------------------------------------------------------- */
interface AvatarProps {
  name: string;
  hue?: number;
  size?: "sm" | "md" | "lg" | "xl";
  verified?: boolean;
  className?: string;
}
export function Avatar({ name, hue = 222, size = "md", verified, className }: AvatarProps) {
  return (
    <span
      className={cx("avatar", size !== "md" && `avatar--${size}`, className)}
      style={{ ["--hue" as string]: hue }}
      aria-hidden="true"
    >
      {initials(name)}
      {verified && (
        <span className="avatar__badge">
          <Icon name="check" size={size === "lg" || size === "xl" ? 14 : 9} strokeWidth={3} />
        </span>
      )}
    </span>
  );
}

/* ---- Rating ------------------------------------------------------------- */
export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span
      className={cx("rating", className)}
      aria-label={`Rated ${value.toFixed(1)} out of 5${count != null ? `, ${count} reviews` : ""}`}
    >
      <Icon name="star-fill" size={15} className="rating__star" aria-hidden="true" />
      <span className="rating__value" aria-hidden="true">{value.toFixed(1)}</span>
      {count != null && <span className="rating__count" aria-hidden="true">({count})</span>}
    </span>
  );
}

/* ---- Price -------------------------------------------------------------- */
export function Price({
  amount,
  period = "day",
  size,
  className,
}: {
  amount: number;
  period?: RatePeriod;
  size?: "lg";
  className?: string;
}) {
  return (
    <span className={cx("price", size === "lg" && "price--lg", className)}>
      {money(amount)}
      <span className="price__unit">/{period}</span>
    </span>
  );
}

/* ---- Tile (placeholder photo) ------------------------------------------- */
export function Tile({
  hue = 222,
  emoji,
  tall,
  className,
  children,
}: {
  hue?: number;
  emoji: string;
  tall?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cx("tile", tall && "tile--tall", className)}
      style={{ ["--hue" as string]: hue }}
    >
      <span className="tile__emoji" aria-hidden="true">{emoji}</span>
      {children}
    </div>
  );
}

/* ---- Field + inputs ----------------------------------------------------- */
interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactElement;
  id?: string;
}
export function Field({ label, hint, error, required, children, id }: FieldProps) {
  const auto = useId();
  const fid = id ?? auto;
  const hintId = hint ? `${fid}-hint` : undefined;
  const errId = error ? `${fid}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="field">
      <label className="field__label" htmlFor={fid}>
        {label}
        {required && <span className="req" aria-hidden="true">*</span>}
      </label>
      {hint && <p className="field__hint" id={hintId}>{hint}</p>}
      {isValidElement(children)
        ? cloneElement(children as ReactElement<Record<string, unknown>>, {
            id: fid,
            "aria-describedby": describedBy,
            "aria-invalid": error ? true : undefined,
            required,
          })
        : children}
      {error && (
        <p className="field__error" id={errId}>
          <Icon name="info" size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

export const TextInput = ({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={cx("input", className)} {...rest} />
);
export const Textarea = ({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={cx("textarea", className)} {...rest} />
);
export const Select = ({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={cx("select", className)} {...rest}>
    {children}
  </select>
);

/* ---- Segmented control (radiogroup) ------------------------------------- */
export interface SegOption<T extends string> {
  value: T;
  label: string;
  icon?: IconName;
}
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: SegOption<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  const idx = options.findIndex((o) => o.value === value);
  function onKey(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (idx + 1) % options.length
        : (idx - 1 + options.length) % options.length;
    onChange(options[next].value);
  }
  return (
    <div className="segmented" role="radiogroup" aria-label={label} onKeyDown={onKey}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            className="segmented__btn"
            onClick={() => onChange(o.value)}
          >
            {o.icon && <Icon name={o.icon} size={18} />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---- Callout ------------------------------------------------------------ */
export function Callout({
  variant,
  icon = "info",
  children,
}: {
  variant?: "info" | "warning";
  icon?: IconName;
  children: ReactNode;
}) {
  return (
    <div className={cx("callout", variant && `callout--${variant}`)}>
      <Icon name={icon} size={18} className="callout__icon" />
      <div>{children}</div>
    </div>
  );
}

/* ---- Empty state -------------------------------------------------------- */
export function Empty({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty">
      <div className="empty__icon"><Icon name={icon} size={30} /></div>
      <p className="empty__title">{title}</p>
      {children && <p>{children}</p>}
    </div>
  );
}

/* ---- Sheet (bottom modal dialog) ---------------------------------------- */
const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const el = ref.current;
    el?.focus();
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && el) {
        const nodes = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="scrim"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} ref={ref} tabIndex={-1}>
        <div className="sheet__grip" aria-hidden="true" />
        <div className="sheet__head">
          <h2 className="sheet__title">{title}</h2>
          <IconButton icon="x" label="Close" onClick={onClose} />
        </div>
        <div className="sheet__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
