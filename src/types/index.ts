export interface Listing {
  id: string;
  title: string;
  type: string;
  location: string;
  pricePerNight: number;
  priceLabel?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  isGuestFavorite?: boolean;
  isRareFind?: boolean;
  bedrooms?: number;
  beds?: number;
  baths?: number;
  maxGuests?: number;
  monthlyPrice?: number;
  originalMonthlyPrice?: number;
  hasMonthlyDiscount?: boolean;
  coordinates?: { lat: number; lng: number };
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  icon: string;
  region?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  isNew?: boolean;
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  isSuperhost: boolean;
  yearsHosting: number;
  reviewCount: number;
  rating: number;
  responseRate: string;
  responseTime: string;
  bio: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  location: string;
  date: string;
  rating: number;
  text: string;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string;
  category?: string;
}

export interface Bedroom {
  id: string;
  name: string;
  bedType: string;
  image: string;
}

export type RatingBreakdown = {
  cleanliness: number;
  accuracy: number;
  checkin: number;
  communication: number;
  location: number;
  value: number;
};

export interface ListingDetail extends Omit<Listing, "bedrooms"> {
  description: string;
  highlights: string[];
  host: Host;
  amenities: Amenity[];
  bedrooms: Bedroom[];
  reviews: Review[];
  ratingBreakdown: RatingBreakdown;
  houseRules: string[];
  safetyInfo: string[];
  cancellationPolicy: string;
}

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface SearchState {
  destination: string;
  destinationId?: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: GuestCounts;
  flexibleDays?: number;
  category: "all" | "homes" | "experiences" | "services";
}

export type SortOption =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating-desc";

export interface ListingSection {
  id: string;
  title: string;
  listings: Listing[];
  href?: string;
}
