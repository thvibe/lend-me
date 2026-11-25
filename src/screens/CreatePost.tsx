import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScreenHeader } from "../components/AppShell";
import { Icon } from "../components/Icon";
import {
  Button,
  Field,
  IconButton,
  Price,
  Select,
  Sheet,
  TextInput,
  Textarea,
  Tile,
  cx,
} from "../components/ui";
import {
  CATEGORIES,
  CONDITION_LABEL,
  CURRENT_USER,
  type CategoryId,
  type Condition,
} from "../lib/data";

const PHOTO_EMOJI = ["📦", "🛠️", "🎒", "🪑", "🎸", "🪴", "🧰", "🎥"];
const STEPS = ["Photos", "Details", "Pricing", "Delivery"];

export default function CreatePost() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>(["📦"]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryId>("tools");
  const [condition, setCondition] = useState<Condition>("good");
  const [description, setDescription] = useState("");
  const [perDay, setPerDay] = useState("");
  const [perWeek, setPerWeek] = useState("");
  const [deposit, setDeposit] = useState("");
  const [pickup, setPickup] = useState(true);
  const [shipping, setShipping] = useState(false);
  const [shipPrice, setShipPrice] = useState("");
  const [published, setPublished] = useState(false);

  const cat = CATEGORIES.find((c) => c.id === category)!;
  const last = step === STEPS.length - 1;
  const canNext =
    step === 0
      ? title.trim().length > 2 && photos.length > 0
      : step === 2
        ? Number(perDay) > 0
        : step === 3
          ? pickup || shipping
          : true;

  function addPhoto() {
    setPhotos((p) => [...p, PHOTO_EMOJI[p.length % PHOTO_EMOJI.length]]);
  }
  function removePhoto(i: number) {
    setPhotos((p) => p.filter((_, x) => x !== i));
  }

  return (
    <>
      <ScreenHeader
        back
        title="New listing"
        right={<span className="caption subtle">{step + 1}/{STEPS.length}</span>}
      />

      <div className="screen--flush">
        <div className="create-body stack gap-5">
          <div className="stepper" aria-hidden="true">
            {STEPS.map((s, i) => (
              <span key={s} className={cx("stepper__dot", i < step && "is-done", i === step && "is-current")} />
            ))}
          </div>
          <p className="step-label">
            Step {step + 1} of {STEPS.length} · <strong>{STEPS[step]}</strong>
          </p>

          {step === 0 && (
            <div className="stack gap-4">
              <div className="field">
                <span className="field__label">Photos</span>
                <p className="field__hint">Add a few clear photos. The first one is your cover.</p>
                <div className="photo-grid">
                  {photos.map((e, i) => (
                    <div key={i} className="photo">
                      <Tile hue={cat.hue} emoji={e} />
                      {i === 0 && <span className="photo__cover">Cover</span>}
                      <IconButton
                        className="photo__rm icon-btn--surface"
                        icon="x"
                        label={`Remove photo ${i + 1}`}
                        size={16}
                        onClick={() => removePhoto(i)}
                      />
                    </div>
                  ))}
                  {photos.length < 6 && (
                    <button type="button" className="photo-add" onClick={addPhoto}>
                      <Icon name="image" size={24} />
                      <span className="caption">Add photo</span>
                    </button>
                  )}
                </div>
              </div>
              <Field label="Title" hint="What are you lending?" required>
                <TextInput
                  placeholder="e.g. Cordless drill + bit set"
                  value={title}
                  maxLength={70}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="stack gap-4">
              <Field label="Category" required>
                <Select value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </Select>
              </Field>
              <div className="field">
                <span className="field__label">Condition</span>
                <div className="stack gap-2" role="radiogroup" aria-label="Condition">
                  {(Object.keys(CONDITION_LABEL) as Condition[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={condition === c}
                      className={cx("option", condition === c && "is-selected")}
                      onClick={() => setCondition(c)}
                    >
                      <span className="option__check"><Icon name="check" size={14} strokeWidth={3} /></span>
                      <span className="grow semibold">{CONDITION_LABEL[c]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Field label="Description" hint="Mention what's included and any care notes.">
                <Textarea
                  placeholder="Describe your item…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="stack gap-4">
              <Field label="Price per day" required>
                <div className="input-group">
                  <span className="input-group__prefix">$</span>
                  <TextInput type="number" inputMode="decimal" min="0" placeholder="0" value={perDay} onChange={(e) => setPerDay(e.target.value)} />
                </div>
              </Field>
              <Field label="Price per week" hint="Optional — offer a weekly discount.">
                <div className="input-group">
                  <span className="input-group__prefix">$</span>
                  <TextInput type="number" inputMode="decimal" min="0" placeholder="0" value={perWeek} onChange={(e) => setPerWeek(e.target.value)} />
                </div>
              </Field>
              <Field label="Deposit" hint="Held, not charged. Refunded on safe return.">
                <div className="input-group">
                  <span className="input-group__prefix">$</span>
                  <TextInput type="number" inputMode="decimal" min="0" placeholder="0" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
                </div>
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="stack gap-4">
              <div className="field">
                <span className="field__label">How can borrowers get it?</span>
                <button
                  type="button"
                  className={cx("option", pickup && "is-selected")}
                  aria-pressed={pickup}
                  onClick={() => setPickup((v) => !v)}
                >
                  <span className="option__check"><Icon name="check" size={14} strokeWidth={3} /></span>
                  <span className="grow">
                    <span className="semibold">Local pickup</span>
                    <span className="field__hint">Meet nearby in {CURRENT_USER.area}</span>
                  </span>
                  <Icon name="box" size={20} />
                </button>
                <button
                  type="button"
                  className={cx("option", shipping && "is-selected")}
                  aria-pressed={shipping}
                  onClick={() => setShipping((v) => !v)}
                >
                  <span className="option__check"><Icon name="check" size={14} strokeWidth={3} /></span>
                  <span className="grow">
                    <span className="semibold">Shipping</span>
                    <span className="field__hint">Send it anywhere in the US</span>
                  </span>
                  <Icon name="truck" size={20} />
                </button>
              </div>
              {shipping && (
                <Field label="Shipping price">
                  <div className="input-group">
                    <span className="input-group__prefix">$</span>
                    <TextInput type="number" min="0" placeholder="0" value={shipPrice} onChange={(e) => setShipPrice(e.target.value)} />
                  </div>
                </Field>
              )}

              <div className="card card--pad stack gap-3">
                <span className="field__label">Preview</span>
                <div className="row gap-3">
                  <Tile hue={cat.hue} emoji={photos[0]} className="thumb" />
                  <div className="grow stack gap-1 min0">
                    <span className="semibold clamp-2">{title || "Your item title"}</span>
                    <span className="muted sm">{cat.label} · {CONDITION_LABEL[condition]}</span>
                    <Price amount={Number(perDay) || 0} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="action-bar">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>Back</Button>
        )}
        {!last ? (
          <Button block disabled={!canNext} trailingIcon="chevron-right" onClick={() => setStep((s) => s + 1)}>
            Continue
          </Button>
        ) : (
          <Button block disabled={!canNext} leadingIcon="check" onClick={() => setPublished(true)}>
            Publish listing
          </Button>
        )}
      </div>

      <Sheet open={published} onClose={() => setPublished(false)} title="Listing published">
        <div className="success-pane">
          <div className="success-ring"><Icon name="check" size={34} strokeWidth={3} /></div>
          <div className="stack gap-1">
            <p className="semibold lg">You're live!</p>
            <p className="muted">{title || "Your item"} is now visible to borrowers near you.</p>
          </div>
          <div className="stack gap-2 full">
            <Button block onClick={() => navigate("/")}>Done</Button>
            <Button variant="ghost" block onClick={() => navigate("/profile")}>View my listings</Button>
          </div>
        </div>
      </Sheet>
    </>
  );
}
