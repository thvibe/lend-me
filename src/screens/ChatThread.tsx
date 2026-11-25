import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ScreenHeader } from "../components/AppShell";
import { Avatar, Button, Empty, IconButton, Price, Tile, cx } from "../components/ui";
import { getConversation, getListing, getUser, type ChatMessage } from "../lib/data";
import { ago } from "../lib/format";

export default function ChatThread() {
  const { id } = useParams();
  const navigate = useNavigate();
  const convo = id ? getConversation(id) : undefined;
  const [messages, setMessages] = useState<ChatMessage[]>(convo ? convo.messages : []);
  const [draft, setDraft] = useState("");

  if (!convo) {
    return (
      <>
        <ScreenHeader back title="Chat" />
        <div className="screen">
          <Empty icon="message" title="Conversation not found" />
        </div>
      </>
    );
  }

  const u = getUser(convo.withUserId);
  const item = getListing(convo.listingId);

  function send(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: `n${m.length}`, fromMe: true, text, hrsAgo: 0 }]);
    setDraft("");
  }

  return (
    <>
      <ScreenHeader
        back
        title={u.name}
        sub={`Responds ${u.responseTime}`}
        right={<Avatar name={u.name} hue={u.avatarHue} size="sm" verified={u.verified} />}
      />

      {item && (
        <div className="thread-context">
          <Tile hue={item.hue} emoji={item.emoji} className="thumb thumb--sm" />
          <Link to={`/listing/${item.id}`} className="grow stack gap-1 min0">
            <span className="semibold truncate">{item.title}</span>
            <Price amount={item.pricePerDay} />
          </Link>
          <Button size="sm" leadingIcon="calendar" onClick={() => navigate(`/agreement/${item.id}`)}>
            Agreement
          </Button>
        </div>
      )}

      <div className="bubbles" role="log" aria-label={`Conversation with ${u.name}`}>
        {messages.map((m) =>
          m.system ? (
            <div key={m.id} className="bubble bubble--system">{m.text}</div>
          ) : (
            <div key={m.id} className={cx("bubble", m.fromMe ? "bubble--me" : "bubble--them")}>
              <div>{m.text}</div>
              <div className="bubble__time">{ago(m.hrsAgo)}</div>
            </div>
          ),
        )}
      </div>

      <form className="composer" onSubmit={send}>
        <input
          className="input"
          placeholder={`Message ${u.name.split(" ")[0]}…`}
          aria-label="Type a message"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <IconButton icon="send" label="Send message" variant="surface" type="submit" />
      </form>
    </>
  );
}
