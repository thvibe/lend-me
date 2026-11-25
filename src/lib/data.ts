/* ============================================================================
   Mock domain data for the Lend Me prototype.
   Photos are intentionally placeholder "tiles" (gradient + emoji) so the
   layout reads clearly without shipping real imagery yet.
   ========================================================================== */

import type { IconName } from "../components/Icon";

export type CategoryId =
  | "tools"
  | "outdoors"
  | "party"
  | "electronics"
  | "sports"
  | "kids"
  | "home"
  | "garden";

export interface Category {
  id: CategoryId;
  label: string;
  icon: IconName;
  hue: number; // used to tint placeholder tiles
}

export const CATEGORIES: Category[] = [
  { id: "tools", label: "Tools", icon: "tool", hue: 222 },
  { id: "outdoors", label: "Outdoors", icon: "tent", hue: 158 },
  { id: "party", label: "Party", icon: "party", hue: 286 },
  { id: "electronics", label: "Electronics", icon: "camera", hue: 205 },
  { id: "sports", label: "Sports", icon: "bike", hue: 24 },
  { id: "kids", label: "Baby & Kids", icon: "stroller", hue: 340 },
  { id: "home", label: "Home", icon: "home", hue: 250 },
  { id: "garden", label: "Garden", icon: "leaf", hue: 120 },
];

export type Condition = "new" | "like-new" | "good" | "fair";
export const CONDITION_LABEL: Record<Condition, string> = {
  new: "New",
  "like-new": "Like new",
  good: "Good",
  fair: "Fair",
};

export interface User {
  id: string;
  name: string;
  avatarHue: number;
  rating: number;
  ratingCount: number;
  verified: boolean;
  area: string;
  memberSince: string;
  responseTime: string;
  bio?: string;
}

export interface Listing {
  id: string;
  title: string;
  category: CategoryId;
  emoji: string;
  hue: number;
  pricePerDay: number;
  pricePerWeek?: number;
  deposit?: number;
  condition: Condition;
  area: string;
  distanceMi: number;
  pickup: boolean;
  shipping: boolean;
  shippingPrice?: number;
  rating: number;
  ratingCount: number;
  postedHrs: number;
  lenderId: string;
  description: string;
}

export const CURRENT_USER: User = {
  id: "me",
  name: "Jordan Reyes",
  avatarHue: 222,
  rating: 4.9,
  ratingCount: 38,
  verified: true,
  area: "Oakland, CA",
  memberSince: "2023",
  responseTime: "within an hour",
  bio: "Weekend tinkerer. I lend out my tools and camping gear when they're idle.",
};

export const USERS: Record<string, User> = {
  me: CURRENT_USER,
  maya: {
    id: "maya",
    name: "Maya Chen",
    avatarHue: 286,
    rating: 4.95,
    ratingCount: 112,
    verified: true,
    area: "Berkeley, CA",
    memberSince: "2021",
    responseTime: "within an hour",
    bio: "Event planner. Lots of party and photo gear to share.",
  },
  diego: {
    id: "diego",
    name: "Diego Santos",
    avatarHue: 158,
    rating: 4.8,
    ratingCount: 64,
    verified: true,
    area: "Oakland, CA",
    memberSince: "2022",
    responseTime: "within a few hours",
    bio: "Avid camper and cyclist.",
  },
  priya: {
    id: "priya",
    name: "Priya N.",
    avatarHue: 24,
    rating: 4.7,
    ratingCount: 29,
    verified: false,
    area: "Alameda, CA",
    memberSince: "2024",
    responseTime: "within a day",
  },
  sam: {
    id: "sam",
    name: "Sam Okafor",
    avatarHue: 205,
    rating: 5.0,
    ratingCount: 51,
    verified: true,
    area: "Emeryville, CA",
    memberSince: "2020",
    responseTime: "within an hour",
    bio: "Film hobbyist with a shelf of cameras and lenses.",
  },
};

export const LISTINGS: Listing[] = [
  {
    id: "l1",
    title: "Bosch 18V cordless drill + bit set",
    category: "tools",
    emoji: "🪛",
    hue: 222,
    pricePerDay: 8,
    pricePerWeek: 35,
    deposit: 40,
    condition: "like-new",
    area: "Oakland, CA",
    distanceMi: 1.2,
    pickup: true,
    shipping: true,
    shippingPrice: 9,
    rating: 4.9,
    ratingCount: 23,
    postedHrs: 5,
    lenderId: "diego",
    description:
      "Powerful 18V drill, barely used. Comes with a 32-piece bit set, spare battery and charger. Great for hanging shelves, flat-pack furniture, small repairs. Please return charged.",
  },
  {
    id: "l2",
    title: "4-person dome tent (weekend ready)",
    category: "outdoors",
    emoji: "⛺",
    hue: 158,
    pricePerDay: 14,
    pricePerWeek: 70,
    deposit: 60,
    condition: "good",
    area: "Oakland, CA",
    distanceMi: 1.2,
    pickup: true,
    shipping: false,
    rating: 4.8,
    ratingCount: 17,
    postedHrs: 20,
    lenderId: "diego",
    description:
      "Easy pop-up dome tent, sleeps 4. Waterproof fly, all poles and stakes included. Cleaned and dried after every trip.",
  },
  {
    id: "l3",
    title: "Sony A7 III + 28–70mm lens",
    category: "electronics",
    emoji: "📷",
    hue: 205,
    pricePerDay: 45,
    pricePerWeek: 240,
    deposit: 300,
    condition: "like-new",
    area: "Emeryville, CA",
    distanceMi: 3.6,
    pickup: true,
    shipping: true,
    shippingPrice: 18,
    rating: 5.0,
    ratingCount: 31,
    postedHrs: 2,
    lenderId: "sam",
    description:
      "Full-frame mirrorless camera, perfect for a shoot or trip. Includes battery, charger, 64GB card and a padded bag. Deposit required and refunded on safe return.",
  },
  {
    id: "l4",
    title: "Folding party tables (set of 3)",
    category: "party",
    emoji: "🎉",
    hue: 286,
    pricePerDay: 10,
    pricePerWeek: 45,
    deposit: 0,
    condition: "good",
    area: "Berkeley, CA",
    distanceMi: 4.1,
    pickup: true,
    shipping: false,
    rating: 4.9,
    ratingCount: 44,
    postedHrs: 30,
    lenderId: "maya",
    description:
      "Three sturdy 6ft folding tables. Great for birthdays, markets, and backyard dinners. Wipe clean before return.",
  },
  {
    id: "l5",
    title: "Pressure washer — 2000 PSI electric",
    category: "garden",
    emoji: "🚿",
    hue: 120,
    pricePerDay: 16,
    pricePerWeek: 75,
    deposit: 50,
    condition: "good",
    area: "Alameda, CA",
    distanceMi: 5.3,
    pickup: true,
    shipping: false,
    rating: 4.6,
    ratingCount: 12,
    postedHrs: 50,
    lenderId: "priya",
    description:
      "Blasts away grime from driveways, decks and patio furniture. Includes two nozzles and a 25ft hose.",
  },
  {
    id: "l6",
    title: "Projector + 100\" screen movie night kit",
    category: "electronics",
    emoji: "📽️",
    hue: 250,
    pricePerDay: 22,
    pricePerWeek: 110,
    deposit: 80,
    condition: "like-new",
    area: "Berkeley, CA",
    distanceMi: 4.0,
    pickup: true,
    shipping: true,
    shippingPrice: 14,
    rating: 4.95,
    ratingCount: 38,
    postedHrs: 8,
    lenderId: "maya",
    description:
      "1080p projector, pull-up screen, HDMI and a Bluetooth speaker. Everything you need for backyard movie night.",
  },
  {
    id: "l7",
    title: "Kids balance bike (ages 2–5)",
    category: "kids",
    emoji: "🚲",
    hue: 340,
    pricePerDay: 5,
    pricePerWeek: 22,
    deposit: 20,
    condition: "good",
    area: "Alameda, CA",
    distanceMi: 5.1,
    pickup: true,
    shipping: true,
    shippingPrice: 10,
    rating: 4.7,
    ratingCount: 9,
    postedHrs: 72,
    lenderId: "priya",
    description:
      "Lightweight balance bike, adjustable seat. Helps little ones learn before pedals. Helmet included.",
  },
  {
    id: "l8",
    title: "Camping stove + cookware set",
    category: "outdoors",
    emoji: "🔥",
    hue: 24,
    pricePerDay: 9,
    pricePerWeek: 40,
    deposit: 25,
    condition: "good",
    area: "Oakland, CA",
    distanceMi: 1.4,
    pickup: true,
    shipping: true,
    shippingPrice: 11,
    rating: 4.85,
    ratingCount: 20,
    postedHrs: 14,
    lenderId: "diego",
    description:
      "Two-burner propane stove with a nesting pot/pan set. Propane not included. Cleaned after each use.",
  },
  {
    id: "l9",
    title: "Werner 6ft aluminium step ladder",
    category: "home",
    emoji: "🪜",
    hue: 250,
    pricePerDay: 6,
    pricePerWeek: 24,
    deposit: 0,
    condition: "good",
    area: "Oakland, CA",
    distanceMi: 0.2,
    pickup: true,
    shipping: false,
    rating: 4.9,
    ratingCount: 15,
    postedHrs: 40,
    lenderId: "me",
    description:
      "Sturdy aluminium step ladder, great for painting, light fixtures and reaching high shelves. Folds flat for easy transport.",
  },
  {
    id: "l10",
    title: "KitchenAid stand mixer (5 qt)",
    category: "home",
    emoji: "🧁",
    hue: 340,
    pricePerDay: 12,
    pricePerWeek: 55,
    deposit: 30,
    condition: "like-new",
    area: "Oakland, CA",
    distanceMi: 0.2,
    pickup: true,
    shipping: true,
    shippingPrice: 15,
    rating: 5.0,
    ratingCount: 8,
    postedHrs: 60,
    lenderId: "me",
    description:
      "Classic tilt-head stand mixer with whisk, dough hook and flat beater. Perfect for a weekend of baking. Wiped down after each lend.",
  },
];

export interface ChatMessage {
  id: string;
  fromMe: boolean;
  text: string;
  hrsAgo: number;
  system?: boolean;
}

export interface Conversation {
  id: string;
  withUserId: string;
  listingId: string;
  unread: number;
  messages: ChatMessage[];
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    withUserId: "sam",
    listingId: "l3",
    unread: 1,
    messages: [
      { id: "m1", fromMe: true, text: "Hi Sam! Is the A7 III free this weekend?", hrsAgo: 6 },
      { id: "m2", fromMe: false, text: "Hey Jordan — yes it is! Fri to Sun works great.", hrsAgo: 5 },
      { id: "m3", fromMe: true, text: "Perfect. Could I pick it up Friday evening?", hrsAgo: 5 },
      { id: "m4", fromMe: false, text: "Sure. I'll send over an agreement with the deposit so we're both covered. 👍", hrsAgo: 2 },
    ],
  },
  {
    id: "c2",
    withUserId: "diego",
    listingId: "l2",
    unread: 0,
    messages: [
      { id: "m1", fromMe: false, text: "The tent's all yours next week. Want it shipped or pickup?", hrsAgo: 26 },
      { id: "m2", fromMe: true, text: "Pickup is easier, thanks! Monday?", hrsAgo: 25 },
      { id: "m3", fromMe: false, text: "Monday works. See you then.", hrsAgo: 24 },
    ],
  },
  {
    id: "c3",
    withUserId: "maya",
    listingId: "l6",
    unread: 0,
    messages: [
      { id: "m1", fromMe: true, text: "Is the projector kit available for a party on the 12th?", hrsAgo: 50 },
      { id: "m2", fromMe: false, text: "It is! I can hold it for you. 🎬", hrsAgo: 49 },
    ],
  },
];

/* ---- selectors ---------------------------------------------------------- */
export const getListing = (id: string) => LISTINGS.find((l) => l.id === id);
export const getUser = (id: string) => USERS[id];
export const getCategory = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id)!;
export const getConversation = (id: string) =>
  CONVERSATIONS.find((c) => c.id === id);
export const listingsByUser = (userId: string) =>
  LISTINGS.filter((l) => l.lenderId === userId);
