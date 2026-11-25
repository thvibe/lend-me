import { Outlet, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { TabBar } from "./TabBar";
import { Icon } from "./Icon";
import { IconButton, cx } from "./ui";

function Frame({ children, tabbar }: { children: ReactNode; tabbar?: boolean }) {
  return (
    <div className="app">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {tabbar && <TabBar />}
    </div>
  );
}

export function AppShell() {
  return (
    <Frame tabbar>
      <Outlet />
    </Frame>
  );
}

export function PlainShell() {
  return (
    <Frame>
      <Outlet />
    </Frame>
  );
}

interface ScreenHeaderProps {
  title?: string;
  sub?: string;
  back?: boolean;
  right?: ReactNode;
  brand?: boolean;
  variant?: "brand";
}

export function ScreenHeader({
  title,
  sub,
  back,
  right,
  brand,
  variant,
}: ScreenHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className={cx("app-header", variant === "brand" && "app-header--brand")}>
      {back && (
        <IconButton
          icon="arrow-left"
          label="Go back"
          variant={variant === "brand" ? "on-brand" : undefined}
          onClick={() => navigate(-1)}
        />
      )}
      {brand ? (
        <h1 className="brandmark">
          <span className="brandmark__logo">
            <Icon name="swap" size={18} />
          </span>
          Lend&nbsp;Me
        </h1>
      ) : (
        <div className="grow">
          {title && <h1 className="app-header__title truncate">{title}</h1>}
          {sub && <p className="app-header__sub truncate">{sub}</p>}
        </div>
      )}
      {right && <div className="row gap-1">{right}</div>}
    </div>
  );
}
