import { Link, useNavigate } from "react-router-dom";
import { ScreenHeader } from "../components/AppShell";
import { Icon } from "../components/Icon";
import { IconButton } from "../components/ui";
import { ListingCard } from "../components/ListingCard";
import { CATEGORIES, CURRENT_USER, LISTINGS } from "../lib/data";

export default function Home() {
  const navigate = useNavigate();
  const near = [...LISTINGS].sort((a, b) => a.distanceMi - b.distanceMi).slice(0, 6);
  const fresh = [...LISTINGS].sort((a, b) => a.postedHrs - b.postedHrs);

  return (
    <>
      <ScreenHeader
        brand
        right={<IconButton icon="bell" label="Notifications" />}
      />
      <div className="screen stack gap-6">
        <div className="stack gap-3">
          <button type="button" className="loc-btn">
            <Icon name="pin" size={16} />
            <span className="subtle sm">Deliver to</span>
            <span className="semibold">{CURRENT_USER.area}</span>
            <Icon name="chevron-down" size={16} />
          </button>
          <Link to="/search" className="searchbar searchbar--button" aria-label="Search listings">
            <Icon name="search" size={20} className="searchbar__icon" />
            <span className="subtle">Search drills, tents, cameras…</span>
          </Link>
        </div>

        <section className="section" aria-labelledby="home-cats">
          <div className="section__head">
            <h2 className="section__title" id="home-cats">Browse categories</h2>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className="cat-card"
                onClick={() => navigate(`/search?category=${c.id}`)}
              >
                <span className="cat-card__icon" style={{ ["--hue" as string]: c.hue }}>
                  <Icon name={c.icon} size={24} />
                </span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="home-near">
          <div className="section__head">
            <h2 className="section__title" id="home-near">Popular near you</h2>
            <Link className="section__link" to="/search">See all</Link>
          </div>
          <div className="scroller cards-row">
            {near.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>

        <Link to="/post" className="promo">
          <div className="promo__icon"><Icon name="swap" size={24} /></div>
          <div className="grow">
            <p className="promo__title">Lend your gear, earn on the weekend</p>
            <p className="promo__sub">List something idle in under a minute.</p>
          </div>
          <Icon name="chevron-right" size={22} />
        </Link>

        <section className="section" aria-labelledby="home-fresh">
          <div className="section__head">
            <h2 className="section__title" id="home-fresh">Fresh listings</h2>
          </div>
          <div className="grid-2">
            {fresh.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
