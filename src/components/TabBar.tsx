import { NavLink } from "react-router-dom";
import { Icon, type IconName } from "./Icon";
import { cx } from "./ui";
import { CONVERSATIONS } from "../lib/data";

const unread = CONVERSATIONS.reduce((n, c) => n + c.unread, 0);

interface Tab {
  to: string;
  icon: IconName;
  label: string;
  end?: boolean;
  fab?: boolean;
  badge?: number;
}

const TABS: Tab[] = [
  { to: "/", icon: "home", label: "Home", end: true },
  { to: "/search", icon: "search", label: "Search" },
  { to: "/post", icon: "plus", label: "Post", fab: true },
  { to: "/messages", icon: "message", label: "Messages", badge: unread },
  { to: "/profile", icon: "user", label: "Profile" },
];

export function TabBar() {
  return (
    <nav className="tabbar" aria-label="Primary">
      {TABS.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={cx("tab", t.fab && "tab--fab")}
          aria-label={t.badge ? `${t.label}, ${t.badge} unread` : t.label}
        >
          <span className="tab__icon">
            <Icon name={t.icon} size={t.fab ? 26 : 24} />
            {t.badge ? (
              <span className="tab__badge" aria-hidden="true">{t.badge}</span>
            ) : null}
          </span>
          <span aria-hidden="true">{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
