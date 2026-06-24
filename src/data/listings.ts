import type { Listing, ListingDetail, Host, Review } from "@/types";
import { avatarPhoto, listingPhoto } from "@/lib/images";

const regions = {
  cape: [
    "Harwich", "Brewster", "Chatham", "Dennis", "Wellfleet", "Provincetown",
    "Falmouth", "Orleans", "Hyannis", "Eastham",
  ],
  boston: ["Boston", "Cambridge", "Somerville", "Brookline"],
  portland: ["Portland", "South Portland", "Cape Elizabeth"],
  other: ["Newport", "Burlington", "Portsmouth", "Salem"],
};

const types = ["Home", "Apartment", "Guesthouse", "Cottage", "Condo", "Loft"];

function imagesFor(id: string, count = 3): string[] {
  return Array.from({ length: count }, (_, i) => listingPhoto(id, i));
}

const taglines = [
  "Walk to everything",
  "Steps from the beach",
  "Quiet neighborhood",
  "Ocean views",
  "Downtown location",
  "Family friendly",
];
const perksList = [
  ["Fast Wi-Fi", "Free cancellation"],
  ["Self check-in", "Free parking"],
  ["Beach access", "Pet friendly"],
  ["Great location", "Free cancellation"],
];

function makeListing(
  id: string,
  opts: Partial<Listing> & Pick<Listing, "title" | "location" | "pricePerNight">,
): Listing {
  const n = Number(id);
  return {
    id,
    type: "Home",
    rating: 4.85 + (n % 15) * 0.01,
    reviewCount: 12 + n * 3,
    images: imagesFor(id),
    beds: 2 + (n % 4),
    bedrooms: 1 + (n % 4),
    baths: 1 + (n % 3),
    maxGuests: 4 + (n % 5),
    tagline: taglines[n % taglines.length],
    perks: perksList[n % perksList.length],
    hostAvatar: avatarPhoto(`host-${id}`),
    ...opts,
  };
}

const baseListings: Listing[] = [
  makeListing("1", {
    title: "The Hideaway - Harwich Port Getaway",
    type: "Home",
    location: "Harwich, Massachusetts",
    pricePerNight: 289,
    priceLabel: "$887 for 2 nights",
    rating: 4.98,
    reviewCount: 44,
    isGuestFavorite: true,
    isRareFind: true,
    tagline: "Walk to everything",
    perks: ["Fast Wi-Fi", "Free cancellation"],
    images: imagesFor("1", 8),
    monthlyPrice: 5831,
    originalMonthlyPrice: 7027,
    hasMonthlyDiscount: true,
    coordinates: { lat: 41.6862, lng: -70.0759 },
  }),
  makeListing("2", {
    title: "Home in Brewster",
    type: "Home",
    location: "Brewster, Massachusetts",
    pricePerNight: 245,
    priceLabel: "$735 for 3 nights",
    rating: 4.95,
    isGuestFavorite: true,
    coordinates: { lat: 41.7601, lng: -70.0828 },
  }),
  makeListing("3", {
    title: "Rock Harbor Hideaway",
    type: "Guesthouse",
    location: "Orleans, Massachusetts",
    pricePerNight: 141,
    priceLabel: "$281 for 2 nights",
    rating: 5.0,
    reviewCount: 42,
    isGuestFavorite: true,
    coordinates: { lat: 41.7898, lng: -69.9901 },
  }),
  makeListing("4", {
    title: "Apartment in Boston",
    type: "Apartment",
    location: "Boston, Massachusetts",
    pricePerNight: 195,
    priceLabel: "$585 for 3 nights",
    rating: 4.91,
    monthlyPrice: 5831,
    originalMonthlyPrice: 7027,
    hasMonthlyDiscount: true,
    coordinates: { lat: 42.3601, lng: -71.0589 },
  }),
  makeListing("5", {
    title: "Home in Chatham",
    type: "Home",
    location: "Chatham, Massachusetts",
    pricePerNight: 320,
    priceLabel: "$960 for 3 nights",
    isGuestFavorite: true,
    coordinates: { lat: 41.6823, lng: -69.9597 },
  }),
  makeListing("6", {
    title: "Cottage in Dennis",
    type: "Cottage",
    location: "Dennis, Massachusetts",
    pricePerNight: 210,
    priceLabel: "$420 for 2 nights",
    coordinates: { lat: 41.7354, lng: -70.1939 },
  }),
  makeListing("7", {
    title: "Home in Portland",
    type: "Home",
    location: "Portland, Maine",
    pricePerNight: 175,
    priceLabel: "$350 for 2 nights",
    isGuestFavorite: true,
    coordinates: { lat: 43.6591, lng: -70.2568 },
  }),
  makeListing("8", {
    title: "Loft in Portland",
    type: "Loft",
    location: "Portland, Maine",
    pricePerNight: 155,
    priceLabel: "$310 for 2 nights",
    coordinates: { lat: 43.6515, lng: -70.2612 },
  }),
  makeListing("9", {
    title: "Home in Wellfleet",
    type: "Home",
    location: "Wellfleet, Massachusetts",
    pricePerNight: 275,
    priceLabel: "$550 for 2 nights",
    isRareFind: true,
    coordinates: { lat: 41.9376, lng: -70.0328 },
  }),
  makeListing("10", {
    title: "Condo in Boston",
    type: "Condo",
    location: "Boston, Massachusetts",
    pricePerNight: 220,
    priceLabel: "$660 for 3 nights",
    coordinates: { lat: 42.3505, lng: -71.0754 },
  }),
  makeListing("11", {
    title: "Home in Provincetown",
    type: "Home",
    location: "Provincetown, Massachusetts",
    pricePerNight: 310,
    isGuestFavorite: true,
    coordinates: { lat: 42.0526, lng: -70.1867 },
  }),
  makeListing("12", {
    title: "Home in Falmouth",
    type: "Home",
    location: "Falmouth, Massachusetts",
    pricePerNight: 265,
    priceLabel: "$795 for 3 nights",
    coordinates: { lat: 41.5515, lng: -70.6148 },
  }),
];

// Generate listings 13–60
const generated: Listing[] = Array.from({ length: 48 }, (_, i) => {
  const id = String(i + 13);
  const regionKeys = Object.keys(regions) as (keyof typeof regions)[];
  const regionKey = regionKeys[i % regionKeys.length];
  const city = regions[regionKey][i % regions[regionKey].length];
  const state =
    regionKey === "portland" ? "Maine" : regionKey === "other" ? "Rhode Island" : "Massachusetts";
  const type = types[i % types.length];
  const price = 120 + ((i * 17) % 200);

  return makeListing(id, {
    title: `${type} in ${city}`,
    type,
    location: `${city}, ${state}`,
    pricePerNight: price,
    priceLabel: `$${price * 2} for 2 nights`,
    isGuestFavorite: i % 3 === 0,
    isRareFind: i % 7 === 0,
    hasMonthlyDiscount: i % 4 === 0,
    monthlyPrice: price * 20,
    originalMonthlyPrice: Math.round(price * 24),
    coordinates: { lat: 41 + i * 0.1, lng: -70 - i * 0.05 },
  });
});

export const listings: Listing[] = [...baseListings, ...generated];

const REGION_ALIASES: Record<string, string[]> = {
  "cape-cod": ["massachusetts", "cape", "harwich", "brewster", "chatham", "orleans", "capecod"],
  portland: ["maine", "portland"],
  boston: ["boston", "cambridge", "somerville", "brookline"],
};

export function filterListings(options: {
  destination?: string;
  region?: string;
}): Listing[] {
  const destination = options.destination?.toLowerCase().trim() ?? "";
  const region = options.region?.toLowerCase().trim() ?? "";

  if (!destination && !region) return listings;

  return listings.filter((listing) => {
    const haystack = `${listing.title} ${listing.location} ${listing.type}`.toLowerCase();

    if (region) {
      const aliases = REGION_ALIASES[region] ?? [region.replace("-", " ")];
      if (aliases.some((alias) => haystack.includes(alias))) return true;
    }

    if (destination) {
      if (haystack.includes(destination)) return true;
      const terms = destination.split(/[\s,]+/).filter(Boolean);
      if (terms.some((term) => haystack.includes(term))) return true;
    }

    return false;
  });
}

export function getListingById(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

const defaultHost = (id: string, name: string): Host => ({
  id: `h-${id}`,
  name,
  avatar: avatarPhoto(name),
  isSuperhost: Number(id) % 2 === 0,
  yearsHosting: 3 + (Number(id) % 10),
  reviewCount: 20 + Number(id) * 5,
  rating: 4.9,
  responseRate: "100%",
  responseTime: "within an hour",
  bio: `${name} loves sharing local tips and making guests feel at home.`,
});

const defaultReviews = (listingId: string): Review[] => [
  {
    id: "r1",
    author: "Sarah",
    avatar: avatarPhoto(`sarah-${listingId}`),
    location: "New York, NY",
    date: "June 2026",
    rating: 5,
    text: "Beautiful stay — clean, comfortable, and exactly as described. Would book again!",
  },
  {
    id: "r2",
    author: "Michael",
    avatar: avatarPhoto(`michael-${listingId}`),
    location: "Boston, MA",
    date: "May 2026",
    rating: 5,
    text: "Great location and thoughtful touches throughout the space. Host was very responsive.",
  },
  {
    id: "r3",
    author: "Emily",
    avatar: avatarPhoto(`emily-${listingId}`),
    location: "Chicago, IL",
    date: "April 2026",
    rating: 5,
    text: "One of our favorite getaways. The photos don't do it justice — even better in person.",
  },
];

function buildDetail(listing: Listing): ListingDetail {
  const hostNames = ["Courtney", "James", "Diane", "Alex", "Maria", "Chris"];
  const hostName = hostNames[Number(listing.id) % hostNames.length];

  return {
    ...listing,
    description: `Welcome to ${listing.title}, a wonderful ${listing.type.toLowerCase()} in ${listing.location}. Enjoy a relaxing stay with modern amenities, a comfortable layout, and easy access to local attractions, dining, and beaches.`,
    highlights: [
      "Self check-in",
      "Great location",
      "Fast wifi",
      "Free parking on premises",
    ],
    highlightDetails: [
      { title: "Top 5% of homes", description: "This home is highly ranked based on ratings, reviews, and reliability.", icon: "trophy" },
      { title: "Self check-in", description: "Check yourself in with the keypad.", icon: "key" },
      { title: "Great location", description: "95% of recent guests gave the location a 5-star rating.", icon: "location" },
    ],
    host: defaultHost(listing.id, hostName),
    amenities: [
      { id: "a1", label: "Kitchen", icon: "kitchen" },
      { id: "a2", label: "Wifi", icon: "wifi" },
      { id: "a3", label: "Free parking on premises", icon: "parking" },
      { id: "a4", label: "Air conditioning", icon: "ac" },
      { id: "a5", label: "Washer", icon: "washer" },
      { id: "a6", label: "TV", icon: "tv" },
    ],
    bedrooms: Array.from({ length: listing.bedrooms ?? 1 }, (_, i) => ({
      id: `b${i + 1}`,
      name: `Bedroom ${i + 1}`,
      bedType: i === 0 ? "1 queen bed" : "2 single beds",
      image: listingPhoto(listing.id, i + 3),
    })),
    reviews: defaultReviews(listing.id),
    ratingBreakdown: {
      cleanliness: listing.rating,
      accuracy: listing.rating - 0.02,
      checkin: listing.rating,
      communication: listing.rating - 0.01,
      location: listing.rating - 0.03,
      value: listing.rating - 0.05,
    },
    houseRules: [
      "Check-in after 3:00 PM",
      "Checkout before 11:00 AM",
      "No smoking",
      "No parties or events",
    ],
    safetyInfo: ["Carbon monoxide alarm", "Smoke alarm"],
    cancellationPolicy: "Free cancellation before check-in for a partial refund.",
  };
}

const listingDetails: Record<string, ListingDetail> = Object.fromEntries(
  listings.slice(0, 12).map((l) => [l.id, buildDetail(l)]),
);

// Enrich first 3 with unique copy
listingDetails["1"] = {
  ...listingDetails["1"],
  description:
    "Escape to The Hideaway, a beautifully renovated Cape Cod retreat minutes from the beach. Open living area, chef's kitchen, and a private backyard perfect for summer evenings. Central Air, Roku TV, fenced-in backyard, and outdoor shower.",
  highlightDetails: [
    { title: "Top 5% of homes", description: "This home is highly ranked based on ratings, reviews, and reliability.", icon: "trophy" },
    { title: "Self check-in", description: "Check yourself in with the keypad.", icon: "key" },
    { title: "Extra spacious", description: "Guests love this home's spaciousness for hanging out.", icon: "location" },
  ],
  host: { ...listingDetails["1"].host, name: "Courtney", isSuperhost: true, yearsHosting: 5, reviewCount: 921, rating: 4.98 },
};
listingDetails["3"] = {
  ...listingDetails["3"],
  description:
    "Welcome to Rock Harbor Hideaway, a cozy guesthouse steps from Rock Harbor in Orleans. Bright open living space, kitchenette, and a private deck overlooking the gardens.",
  host: { ...listingDetails["3"].host, name: "Diane", isSuperhost: true, yearsHosting: 10, reviewCount: 1124, rating: 5.0 },
};

export function getListingDetailById(id: string): ListingDetail | undefined {
  if (listingDetails[id]) return listingDetails[id];
  const listing = getListingById(id);
  return listing ? buildDetail(listing) : undefined;
}
