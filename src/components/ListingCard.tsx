import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Badge, IconButton, Price, Rating, Tile } from "./ui";
import { miles, money } from "../lib/format";
import type { Listing } from "../lib/data";

export function ListingCard({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(false);
  return (
    <Link to={`/listing/${listing.id}`} className="listing-card">
      <Tile hue={listing.hue} emoji={listing.emoji}>
        <IconButton
          className="tile__fav icon-btn--surface"
          icon={saved ? "heart-fill" : "heart"}
          label={saved ? "Remove from saved" : "Save listing"}
          size={18}
          onClick={(e) => {
            e.preventDefault();
            setSaved((s) => !s);
          }}
        />
        {listing.deposit ? (
          <span className="tile__tags">
            <Badge variant="deposit">{money(listing.deposit)} deposit</Badge>
          </span>
        ) : null}
      </Tile>
      <div className="listing-card__body">
        <p className="listing-card__title clamp-2">{listing.title}</p>
        <div className="listing-card__meta">
          <Rating value={listing.rating} />
          <span aria-hidden="true">·</span>
          <span className="row gap-1">
            <Icon name="pin" size={13} />
            {miles(listing.distanceMi)}
          </span>
        </div>
        <div className="listing-card__foot">
          <Price amount={listing.pricePerDay} />
          {listing.shipping ? <Badge icon="truck">Ships</Badge> : null}
        </div>
      </div>
    </Link>
  );
}
