/** Stable listing photos — picsum seeds avoid hotlink / 404 issues with Unsplash. */
export function listingPhoto(id: string, index = 0): string {
  return `https://picsum.photos/seed/airbnb-${id}-${index}/800/600`;
}

export function avatarPhoto(seed: string): string {
  return `https://i.pravatar.cc/150?u=${encodeURIComponent(seed)}`;
}

export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";
