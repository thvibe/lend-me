import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScreenHeader } from "../components/AppShell";
import { Icon } from "../components/Icon";
import {
  Avatar,
  Badge,
  Button,
  Empty,
  IconButton,
  Rating,
  Segmented,
  Sheet,
  Tile,
} from "../components/ui";
import { ListingCard } from "../components/ListingCard";
import { CURRENT_USER, getListing, listingsByUser } from "../lib/data";
import { useTheme } from "../lib/theme";

type Tab = "listings" | "borrowing" | "history";
const TABS: { v: Tab; label: string }[] = [
  { v: "listings", label: "My listings" },
  { v: "borrowing", label: "Borrowing" },
  { v: "history", label: "History" },
];

export default function Profile() {
  const [tab, setTab] = useState<Tab>("listings");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mine = listingsByUser("me");

  return (
    <>
      <ScreenHeader
        title="Profile"
        right={<IconButton icon="settings" label="Settings" onClick={() => setSettingsOpen(true)} />}
      />

      <div className="screen stack gap-5">
        <div className="profile-head">
          <Avatar name={CURRENT_USER.name} hue={CURRENT_USER.avatarHue} size="xl" verified={CURRENT_USER.verified} />
          <div className="stack gap-1 profile-head__id">
            <h2 className="row gap-2">
              {CURRENT_USER.name}
              {CURRENT_USER.verified && <Badge variant="primary" icon="shield-check">Verified</Badge>}
            </h2>
            <p className="muted sm row gap-1">
              <Icon name="pin" size={14} />
              {CURRENT_USER.area} · Member since {CURRENT_USER.memberSince}
            </p>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="stat__n">{mine.length}</span>
              <span className="stat__l">Listings</span>
            </div>
            <div className="stat">
              <span className="stat__n">{CURRENT_USER.rating.toFixed(1)}</span>
              <span className="stat__l">Rating</span>
            </div>
            <div className="stat">
              <span className="stat__n">{CURRENT_USER.ratingCount}</span>
              <span className="stat__l">Reviews</span>
            </div>
          </div>

          <Button variant="secondary" block leadingIcon="edit">Edit profile</Button>
        </div>

        <div className="pill-tab-list" role="tablist" aria-label="Your activity">
          {TABS.map((t) => (
            <button
              key={t.v}
              type="button"
              role="tab"
              aria-selected={tab === t.v}
              className="pill-tab"
              onClick={() => setTab(t.v)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "listings" &&
          (mine.length ? (
            <div className="grid-2">
              {mine.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          ) : (
            <Empty icon="tag" title="No listings yet">List your first idle item to start earning.</Empty>
          ))}

        {tab === "borrowing" && <BorrowingTab />}
        {tab === "history" && <HistoryTab />}
      </div>

      <Sheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Settings">
        <div className="stack gap-5">
          <div className="field">
            <span className="field__label">Appearance</span>
            <Segmented
              label="Theme"
              value={theme}
              onChange={setTheme}
              options={[
                { value: "system", label: "System" },
                { value: "light", label: "Light", icon: "sun" },
                { value: "dark", label: "Dark", icon: "moon" },
              ]}
            />
          </div>

          <div className="rows">
            <button type="button" className="row-item">
              <Icon name="shield" size={20} />
              <span className="grow row-item__title">Verification &amp; safety</span>
              <Icon name="chevron-right" size={18} className="row-item__chevron" />
            </button>
            <button type="button" className="row-item">
              <Icon name="info" size={20} />
              <span className="grow row-item__title">Help &amp; support</span>
              <Icon name="chevron-right" size={18} className="row-item__chevron" />
            </button>
            <button type="button" className="row-item">
              <Icon name="lock" size={20} />
              <span className="grow row-item__title">Privacy</span>
              <Icon name="chevron-right" size={18} className="row-item__chevron" />
            </button>
          </div>

          <Button variant="secondary" block leadingIcon="logout">Log out</Button>
        </div>
      </Sheet>
    </>
  );
}

function BorrowingTab() {
  const navigate = useNavigate();
  const item = getListing("l3");
  if (!item) return null;
  return (
    <div className="stack gap-3">
      <article className="card card--pad borrow-card">
        <div className="row gap-3">
          <Tile hue={item.hue} emoji={item.emoji} className="thumb" />
          <div className="grow stack gap-1">
            <Badge variant="success" icon="check">Active</Badge>
            <p className="semibold clamp-2">{item.title}</p>
            <p className="muted sm row gap-1"><Icon name="calendar" size={14} /> Return by Sat, Dec 13</p>
          </div>
        </div>
        <Button variant="secondary" block onClick={() => navigate("/agreement/l3")}>
          View agreement
        </Button>
      </article>
    </div>
  );
}

function HistoryTab() {
  const items = [getListing("l4"), getListing("l6")].filter(Boolean);
  return (
    <div className="rows">
      {items.map((it) => (
        <div key={it!.id} className="row-item">
          <Tile hue={it!.hue} emoji={it!.emoji} className="thumb thumb--sm" />
          <div className="grow stack gap-1">
            <span className="row-item__title clamp-2">{it!.title}</span>
            <span className="row gap-2">
              <Badge>Returned</Badge>
              <Rating value={5} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
