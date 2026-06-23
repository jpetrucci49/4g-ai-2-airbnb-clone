export const SITE_NAME = "Airbnb Clone";

export const GUEST_LIMITS = {
  adults: { min: 1, max: 16 },
  children: { min: 0, max: 16 },
  infants: { min: 0, max: 5 },
  pets: { min: 0, max: 5 },
} as const;

export const LOADING_DELAY_MS = 1500;
