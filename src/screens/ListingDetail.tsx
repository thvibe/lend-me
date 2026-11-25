import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ScreenHeader } from "../components/AppShell";
import { Icon, type IconName } from "../components/Icon";
import {
  Avatar,
  Badge,
  Button,
  Callout,
  Empty,
  IconButton,
  Price,
  Rating,
  Tile,
} from "../components/ui";
import {
  CONDITION_LABEL,
  CONVERSATIONS,
  getCategory,
  getListing,
  getUser,
} from "../lib/data";
import { miles, money, rate } from "../lib/format";

function Spec({ icon, k, v }: { icon: IconName; k: string; v: string }) {
  return (
    <div className="spec">
      <Icon name={icon} size={18} className="spec__icon" />
      <div>
        <p className="caption subtle">{k}</p>
        <p className="semibold">{v}</p>
      </div>
    </div>
  );
}

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const listing = id ? getListing(id) : undefined;

  if (!listing) {
    return (
      <>
        <ScreenHeader back title="Listing" />
        <div className="screen">
          <Empty icon="search" title="Listing not found">
            It may have been removed by the owner.
          </Empty>
        </div>
      </>
    );
  }

  const lender = getUser(listing.lenderId);
  const cat = getCategory(listing.category);
  const convo = CONVERSATIONS.find((c) => c.withUserId === listing.lenderId);
  const delivery =
    listing.pickup && listing.shipping
      ? "Pickup or ship"
      : listing.shipping
        ? "Shipping"
        : "Pickup";

  return (
    <>
      <ScreenHeader
        back
        title={cat.label}
        right={
          <>
            <IconButton icon="dots" label="More options" />
            <IconButton
              icon={saved ? "heart-fill" : "heart"}
              label={saved ? "Saved" : "Save listing"}
              onClick={() => setSaved((s) => !s)}
            />
          </>
        }
      />

      <div className="screen--flush">
        <Tile hue={listing.hue} emoji={listing.emoji} className="detail-gallery">
          <span className="tile__count" aria-hidden="true">1 / 4</span>
        </Tile>

        <div className="detail-body stack gap-5">
          <div className="stack gap-2">
            <div className="row wrap gap-2">
              <Badge>{CONDITION_LABEL[listing.condition]}</Badge>
              {listing.deposit ? (
                <Badge variant="deposit" icon="shield">{money(listing.deposit)} deposit</Badge>
              ) : (
                <Badge variant="success" icon="check">No deposit</Badge>
              )}
            </div>
            <h1 className="detail-title">{listing.title}</h1>
            <div className="row wrap gap-3">
              <Rating value={listing.rating} count={listing.ratingCount} />
              <span className="row gap-1 muted sm">
                <Icon name="pin" size={14} />
                {listing.area} · {miles(listing.distanceMi)}
              </span>
            </div>
          </div>

          <div className="card card--pad">
            <div className="row between top">
              <div>
                <Price amount={listing.pricePerDay} size="lg" />
                {listing.pricePerWeek && (
                  <p className="muted sm">or {rate(listing.pricePerWeek, "week")}</p>
                )}
              </div>
              <div className="right stack gap-2">
                <p className="caption subtle">Delivery</p>
                <div className="row gap-2 wrap">
                  {listing.pickup && <Badge icon="box">Pickup</Badge>}
                  {listing.shipping && (
                    <Badge icon="truck">Ships {money(listing.shippingPrice ?? 0)}</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Link to="/profile" className="lender-row card card--pad">
            <Avatar name={lender.name} hue={lender.avatarHue} size="lg" verified={lender.verified} />
            <div className="grow">
              <p className="semibold row gap-1">
                {lender.name}
                {lender.verified && (
                  <Icon name="shield-check" size={16} className="verified-ic" aria-label="Verified" />
                )}
              </p>
              <Rating value={lender.rating} count={lender.ratingCount} />
              <p className="subtle caption">Responds {lender.responseTime}</p>
            </div>
            <Icon name="chevron-right" size={20} className="row-item__chevron" />
          </Link>

          <section className="stack gap-3">
            <h2 className="section__title">Details</h2>
            <div className="spec-grid">
              <Spec icon="tag" k="Condition" v={CONDITION_LABEL[listing.condition]} />
              <Spec icon="pin" k="Distance" v={miles(listing.distanceMi)} />
              <Spec icon={listing.shipping ? "truck" : "box"} k="Delivery" v={delivery} />
              <Spec icon="shield" k="Deposit" v={listing.deposit ? money(listing.deposit) : "None"} />
            </div>
          </section>

          <section className="stack gap-2">
            <h2 className="section__title">Description</h2>
            <p className="detail-desc">{listing.description}</p>
          </section>

          <Callout variant="info" icon="shield-check">
            <strong>Protected lending.</strong> You'll agree on dates and a deposit up
            front. If the item comes back damaged, the deposit helps cover repair or
            replacement — and a damage fee only applies with photo evidence.
          </Callout>
        </div>
      </div>

      <div className="action-bar">
        <Button
          variant="secondary"
          leadingIcon="message"
          onClick={() => navigate(convo ? `/messages/${convo.id}` : "/messages")}
        >
          Message
        </Button>
        <Button
          block
          leadingIcon="calendar"
          onClick={() => navigate(`/agreement/${listing.id}`)}
        >
          Request to borrow
        </Button>
      </div>
    </>
  );
}
