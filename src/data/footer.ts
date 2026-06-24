export const inspirationTabs = [
  { id: "popular", label: "Popular" },
  { id: "arts", label: "Arts & culture" },
  { id: "beach", label: "Beach" },
  { id: "mountains", label: "Mountains" },
  { id: "outdoors", label: "Outdoors" },
  { id: "things-to-do", label: "Things to do" },
];

export const inspirationLinks: Record<string, { title: string; subtitle: string }[]> = {
  popular: [
    { title: "Amsterdam", subtitle: "Holiday rentals" },
    { title: "Athens", subtitle: "Vacation rentals" },
    { title: "Barcelona", subtitle: "Vacation rentals" },
    { title: "Boston", subtitle: "Vacation rentals" },
    { title: "Cape Cod", subtitle: "Vacation rentals" },
    { title: "Orlando", subtitle: "Vacation rentals" },
    { title: "Paris", subtitle: "Holiday rentals" },
    { title: "Portland", subtitle: "Vacation rentals" },
    { title: "Rome", subtitle: "Vacation rentals" },
    { title: "San Diego", subtitle: "Vacation rentals" },
    { title: "Sydney", subtitle: "Holiday rentals" },
    { title: "Tokyo", subtitle: "Holiday rentals" },
  ],
  arts: [
    { title: "Florence", subtitle: "Arts & culture" },
    { title: "Vienna", subtitle: "Arts & culture" },
    { title: "Berlin", subtitle: "Arts & culture" },
  ],
  beach: [
    { title: "Miami", subtitle: "Beach rentals" },
    { title: "Malibu", subtitle: "Beach rentals" },
    { title: "Hawaii", subtitle: "Beach rentals" },
  ],
  mountains: [
    { title: "Aspen", subtitle: "Mountain rentals" },
    { title: "Denver", subtitle: "Mountain rentals" },
  ],
  outdoors: [
    { title: "Yellowstone", subtitle: "Outdoor stays" },
    { title: "Yosemite", subtitle: "Outdoor stays" },
  ],
  "things-to-do": [
    { title: "New York", subtitle: "Things to do" },
    { title: "London", subtitle: "Things to do" },
  ],
};

export const footerColumns = [
  {
    title: "Support",
    links: ["Help Center", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options"],
  },
  {
    title: "Hosting",
    links: ["Airbnb your home", "Airbnb Experiences", "Airbnb your service", "AirCover for Hosts"],
  },
  {
    title: "Airbnb",
    links: ["Newsroom", "New features", "Careers", "Investors", "Gift cards"],
  },
];
