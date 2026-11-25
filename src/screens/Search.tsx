import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import {
  Button,
  Chip,
  IconButton,
  Segmented,
  Sheet,
  Empty,
  cx,
} from "../components/ui";
import { ListingCard } from "../components/ListingCard";
import { CATEGORIES, LISTINGS, type CategoryId } from "../lib/data";
import { pluralize } from "../lib/format";

type Sort = "near" | "price" | "rating" | "new";
type Delivery = "any" | "pickup" | "shipping";

const SORTS: { v: Sort; label: string }[] = [
  { v: "near", label: "Nearest first" },
  { v: "price", label: "Price: low to high" },
  { v: "rating", label: "Top rated" },
  { v: "new", label: "Newest" },
];

const SORT_LABEL: Record<Sort, string> = {
  near: "Nearest",
  price: "Price",
  rating: "Top rated",
  new: "Newest",
};

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<CategoryId | null>(
    (params.get("category") as CategoryId | null) ?? null,
  );
  const [delivery, setDelivery] = useState<Delivery>("any");
  const [noDeposit, setNoDeposit] = useState(false);
  const [sort, setSort] = useState<Sort>("near");
  const [filtersOpen, setFiltersOpen] = useState(false);

  function pickCategory(id: CategoryId | null) {
    setCategory(id);
    const next = new URLSearchParams(params);
    if (id) next.set("category", id);
    else next.delete("category");
    setParams(next, { replace: true });
  }

  const results = useMemo(() => {
    const filtered = LISTINGS.filter((l) => {
      if (category && l.category !== category) return false;
      if (q && !`${l.title} ${l.area}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      if (delivery === "pickup" && !l.pickup) return false;
      if (delivery === "shipping" && !l.shipping) return false;
      if (noDeposit && l.deposit) return false;
      return true;
    });
    const cmp: Record<Sort, (a: (typeof LISTINGS)[0], b: (typeof LISTINGS)[0]) => number> = {
      near: (a, b) => a.distanceMi - b.distanceMi,
      price: (a, b) => a.pricePerDay - b.pricePerDay,
      rating: (a, b) => b.rating - a.rating,
      new: (a, b) => a.postedHrs - b.postedHrs,
    };
    return [...filtered].sort(cmp[sort]);
  }, [q, category, delivery, noDeposit, sort]);

  const activeFilters = (delivery !== "any" ? 1 : 0) + (noDeposit ? 1 : 0);

  return (
    <>
      <div className="app-header">
        <div className="searchbar grow">
          <Icon name="search" size={20} className="searchbar__icon" />
          <input
            className="searchbar__input"
            placeholder="Search listings"
            aria-label="Search listings"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q && (
            <IconButton icon="x" label="Clear search" size={18} onClick={() => setQ("")} />
          )}
        </div>
        <IconButton
          icon="sliders"
          label={activeFilters ? `Filters, ${activeFilters} active` : "Filters"}
          variant="surface"
          onClick={() => setFiltersOpen(true)}
        />
      </div>

      <div className="screen stack gap-4">
        <div className="scroller" role="group" aria-label="Filter by category">
          <Chip selected={category === null} onClick={() => pickCategory(null)}>
            All
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip
              key={c.id}
              icon={c.icon}
              selected={category === c.id}
              onClick={() => pickCategory(category === c.id ? null : c.id)}
            >
              {c.label}
            </Chip>
          ))}
        </div>

        <div className="result-head">
          <p className="muted sm" aria-live="polite">
            {pluralize(results.length, "result")}
          </p>
          <button className="link-btn row gap-1" onClick={() => setFiltersOpen(true)}>
            <Icon name="sliders" size={16} />
            Sort: {SORT_LABEL[sort]}
          </button>
        </div>

        {results.length > 0 ? (
          <div className="grid-2">
            {results.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        ) : (
          <Empty icon="search" title="No matches">
            Try clearing filters or searching a different item.
          </Empty>
        )}
      </div>

      <Sheet open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters & sort">
        <div className="stack gap-5">
          <div className="field">
            <span className="field__label">Delivery</span>
            <Segmented
              label="Delivery option"
              value={delivery}
              onChange={setDelivery}
              options={[
                { value: "any", label: "Any" },
                { value: "pickup", label: "Pickup", icon: "box" },
                { value: "shipping", label: "Ships", icon: "truck" },
              ]}
            />
          </div>

          <button
            type="button"
            className={cx("option", noDeposit && "is-selected")}
            aria-pressed={noDeposit}
            onClick={() => setNoDeposit((v) => !v)}
          >
            <span className="option__check"><Icon name="check" size={14} strokeWidth={3} /></span>
            <span className="grow">
              <span className="semibold">No deposit required</span>
              <span className="field__hint">Only show items you can borrow without a deposit</span>
            </span>
          </button>

          <div className="field">
            <span className="field__label">Sort by</span>
            <div className="stack gap-2" role="radiogroup" aria-label="Sort by">
              {SORTS.map((s) => (
                <button
                  key={s.v}
                  type="button"
                  role="radio"
                  aria-checked={sort === s.v}
                  className={cx("option", sort === s.v && "is-selected")}
                  onClick={() => setSort(s.v)}
                >
                  <span className="option__check"><Icon name="check" size={14} strokeWidth={3} /></span>
                  <span className="grow semibold">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button block onClick={() => setFiltersOpen(false)}>
            Show {pluralize(results.length, "result")}
          </Button>
        </div>
      </Sheet>
    </>
  );
}
