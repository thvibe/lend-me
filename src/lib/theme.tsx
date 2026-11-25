import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "system" | "light" | "dark";
export type Resolved = "light" | "dark";

const KEY = "lendme-theme";

interface ThemeCtxValue {
  theme: Theme;
  resolved: Resolved;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeCtx = createContext<ThemeCtxValue>({
  theme: "system",
  resolved: "light",
  setTheme: () => {},
  toggle: () => {},
});

function readStored(): Theme {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* private mode / blocked storage */
  }
  return "system";
}

function systemDark(): boolean {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStored);
  const [sysDark, setSysDark] = useState<boolean>(systemDark);

  useEffect(() => {
    let mq: MediaQueryList;
    try {
      mq = window.matchMedia("(prefers-color-scheme: dark)");
    } catch {
      return;
    }
    const handler = (e: MediaQueryListEvent) => setSysDark(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const resolved: Resolved =
    theme === "system" ? (sysDark ? "dark" : "light") : theme;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") delete root.dataset.theme;
    else root.dataset.theme = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // keep the browser UI (status bar) colour in step with the resolved theme
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]:not([media])',
    );
    if (meta) meta.content = resolved === "dark" ? "#0a1326" : "#ffffff";
  }, [resolved]);

  const value: ThemeCtxValue = {
    theme,
    resolved,
    setTheme: setThemeState,
    toggle: () => setThemeState(resolved === "dark" ? "light" : "dark"),
  };

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeCtx);
