import { Link } from "react-router-dom";
import { ScreenHeader } from "../components/AppShell";
import { Avatar, Empty } from "../components/ui";
import { CONVERSATIONS, getListing, getUser } from "../lib/data";
import { ago } from "../lib/format";
import { cx } from "../components/ui";

export default function Messages() {
  return (
    <>
      <ScreenHeader title="Messages" />
      <div className="screen">
        {CONVERSATIONS.length ? (
          <div className="rows">
            {CONVERSATIONS.map((c) => {
              const u = getUser(c.withUserId);
              const item = getListing(c.listingId);
              const last = c.messages[c.messages.length - 1];
              return (
                <Link key={c.id} to={`/messages/${c.id}`} className="row-item">
                  <Avatar name={u.name} hue={u.avatarHue} verified={u.verified} />
                  <div className="grow stack gap-1 min0">
                    <div className="row between gap-2">
                      <span className="row-item__title truncate">{u.name}</span>
                      <span className="caption subtle">{ago(last.hrsAgo)}</span>
                    </div>
                    <div className="row between gap-2">
                      <span className={cx("row-item__sub truncate", c.unread > 0 && "is-unread")}>
                        {last.fromMe ? "You: " : ""}
                        {last.text}
                      </span>
                      {c.unread ? (
                        <span className="unread-dot" aria-label={`${c.unread} unread`} />
                      ) : null}
                    </div>
                    <span className="caption subtle truncate">{item?.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <Empty icon="message" title="No messages yet">
            Start a conversation from any listing.
          </Empty>
        )}
      </div>
    </>
  );
}
