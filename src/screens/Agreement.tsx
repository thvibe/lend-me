import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScreenHeader } from "../components/AppShell";
import { Icon } from "../components/Icon";
import {
  Avatar,
  Badge,
  Button,
  Callout,
  Empty,
  Field,
  Segmented,
  Sheet,
  TextInput,
  Tile,
  cx,
} from "../components/ui";
import { CONVERSATIONS, getListing, getUser } from "../lib/data";
import { daysBetween, formatDate, money, spanPrice } from "../lib/format";

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function Agreement() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const listing = listingId ? getListing(listingId) : undefined;

  const today = new Date();
  const defStart = new Date(today);
  defStart.setDate(today.getDate() + 4);
  const defEnd = new Date(defStart);
  defEnd.setDate(defStart.getDate() + 2);

  const [startDate, setStartDate] = useState(iso(defStart));
  const [endDate, setEndDate] = useState(iso(defEnd));
  const [startTime, setStartTime] = useState("17:00");
  const [endTime, setEndTime] = useState("18:00");
  const [method, setMethod] = useState<"pickup" | "ship">(
    listing?.pickup ? "pickup" : "ship",
  );
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);

  const calc = useMemo(() => {
    if (!listing) return null;
    const days = daysBetween(new Date(startDate), new Date(endDate));
    const rental = spanPrice(days, listing.pricePerDay, listing.pricePerWeek);
    const shipping = method === "ship" ? listing.shippingPrice ?? 0 : 0;
    const serviceFee = Math.round(rental * 0.1);
    const deposit = listing.deposit ?? 0;
    return { days, rental, shipping, serviceFee, deposit, dueToday: rental + shipping + serviceFee + deposit };
  }, [listing, startDate, endDate, method]);

  if (!listing || !calc) {
    return (
      <>
        <ScreenHeader back title="Agreement" />
        <div className="screen">
          <Empty icon="calendar" title="Listing not found" />
        </div>
      </>
    );
  }

  const lender = getUser(listing.lenderId);
  const firstName = lender.name.split(" ")[0];
  const convo = CONVERSATIONS.find((c) => c.withUserId === listing.lenderId);
  const datesValid = new Date(endDate) >= new Date(startDate);

  return (
    <>
      <ScreenHeader back title="Lending agreement" />

      <div className="screen--flush">
        <div className="agreement-body stack gap-5">
          <div className="card card--pad row gap-3">
            <Tile hue={listing.hue} emoji={listing.emoji} className="thumb" />
            <div className="grow stack gap-1 min0">
              <span className="semibold clamp-2">{listing.title}</span>
              <span className="row gap-2">
                <Avatar name={lender.name} hue={lender.avatarHue} size="sm" verified={lender.verified} />
                <span className="muted sm">{lender.name}</span>
              </span>
            </div>
          </div>

          <section className="stack gap-3">
            <h2 className="section__title">Rental period</h2>
            <div className="grid-2">
              <Field label="Start date">
                <TextInput type="date" value={startDate} min={iso(today)} onChange={(e) => setStartDate(e.target.value)} />
              </Field>
              <Field label="Pickup time">
                <TextInput type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </Field>
              <Field label="End date">
                <TextInput type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} />
              </Field>
              <Field label="Return time">
                <TextInput type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </Field>
            </div>
            {!datesValid && (
              <p className="field__error">
                <Icon name="info" size={14} />
                End date must be on or after the start date.
              </p>
            )}
            <div className="callout">
              <Icon name="calendar" size={18} className="callout__icon" />
              <div>
                <strong>{calc.days} {calc.days === 1 ? "day" : "days"}</strong> ·{" "}
                {formatDate(new Date(startDate))} → {formatDate(new Date(endDate))}
              </div>
            </div>
          </section>

          {listing.pickup && listing.shipping && (
            <section className="stack gap-3">
              <h2 className="section__title">Handover</h2>
              <Segmented
                label="Handover method"
                value={method}
                onChange={setMethod}
                options={[
                  { value: "pickup", label: "Pickup", icon: "box" },
                  { value: "ship", label: "Ship it", icon: "truck" },
                ]}
              />
            </section>
          )}

          <section className="stack gap-3">
            <h2 className="section__title">Cost</h2>
            <div className="card card--pad">
              <div className="kv">
                <span className="kv__k">Rental · {calc.days} {calc.days === 1 ? "day" : "days"}</span>
                <span className="kv__v">{money(calc.rental)}</span>
              </div>
              {calc.shipping > 0 && (
                <div className="kv">
                  <span className="kv__k">Shipping</span>
                  <span className="kv__v">{money(calc.shipping)}</span>
                </div>
              )}
              <div className="kv">
                <span className="kv__k">Service fee</span>
                <span className="kv__v">{money(calc.serviceFee)}</span>
              </div>
              <div className="kv">
                <span className="kv__k row gap-1">Deposit <Badge variant="deposit">refundable</Badge></span>
                <span className="kv__v">{calc.deposit ? money(calc.deposit) : "—"}</span>
              </div>
              <div className="kv kv--total">
                <span className="kv__k">Due today</span>
                <span className="kv__v">{money(calc.dueToday)}</span>
              </div>
            </div>
          </section>

          <section className="stack gap-3">
            <h2 className="section__title">Deposit &amp; damage policy</h2>
            <Callout variant="info" icon="shield-check">
              Your <strong>{money(calc.deposit)} deposit</strong> is held, not charged, and
              refunded within 48 hours of a safe return.
            </Callout>
            <Callout variant="warning" icon="info">
              If the item comes back damaged, {firstName} can open a claim with photos. An
              agreed damage fee is deducted from the deposit; anything beyond it is billed
              separately.
            </Callout>
          </section>

          <button
            type="button"
            className={cx("option", agreed && "is-selected")}
            aria-pressed={agreed}
            onClick={() => setAgreed((a) => !a)}
          >
            <span className="option__check"><Icon name="check" size={14} strokeWidth={3} /></span>
            <span className="grow">
              <span className="semibold">I agree to the lending terms</span>
              <span className="field__hint">You and {firstName} both confirm before the handover.</span>
            </span>
          </button>
        </div>
      </div>

      <div className="action-bar">
        <div className="stack gap-0">
          <span className="caption subtle">Due today</span>
          <span className="price">{money(calc.dueToday)}</span>
        </div>
        <Button block disabled={!agreed || !datesValid} leadingIcon="send" onClick={() => setSent(true)}>
          Send agreement
        </Button>
      </div>

      <Sheet open={sent} onClose={() => setSent(false)} title="Agreement sent">
        <div className="success-pane">
          <div className="success-ring"><Icon name="check" size={34} strokeWidth={3} /></div>
          <div className="stack gap-1">
            <p className="semibold lg">Sent to {lender.name}</p>
            <p className="muted">They'll review the dates and deposit. You'll get a message when it's confirmed.</p>
          </div>
          <div className="stack gap-2 full">
            <Button block leadingIcon="message" onClick={() => navigate(convo ? `/messages/${convo.id}` : "/messages")}>
              Go to chat
            </Button>
            <Button variant="ghost" block onClick={() => navigate("/")}>Back to home</Button>
          </div>
        </div>
      </Sheet>
    </>
  );
}
