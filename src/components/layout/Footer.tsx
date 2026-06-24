"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";

const inspirationTabs = [
  { id: "popular", label: "Popular" },
  { id: "arts", label: "Arts & culture" },
  { id: "beach", label: "Beach" },
  { id: "mountains", label: "Mountains" },
  { id: "outdoors", label: "Outdoors" },
  { id: "things-to-do", label: "Things to do" },
];

const inspirationLinks: Record<string, { title: string; subtitle: string }[]> = {
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

const footerColumns = [
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

export function Footer() {
  const [activeTab, setActiveTab] = useState("popular");
  const links = inspirationLinks[activeTab] ?? inspirationLinks.popular;

  return (
    <footer className="mt-auto border-t border-border-light bg-bg-subtle md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <h2 className="mb-6 text-sm font-semibold">Inspiration for future getaways</h2>
        <Tabs tabs={inspirationTabs} activeId={activeTab} onChange={setActiveTab} />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {links.map((link) => (
            <a
              key={link.title}
              href="#"
              className="text-sm hover:underline"
            >
              <span className="font-medium">{link.title}</span>
              <br />
              <span className="text-text-secondary">{link.subtitle}</span>
            </a>
          ))}
        </div>
        <button type="button" className="mt-4 text-sm font-semibold underline">
          Show more
        </button>

        <div className="mt-10 grid gap-8 border-t border-border-default pt-8 md:grid-cols-3">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-text-secondary hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border-default">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-text-secondary sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 Airbnb Clone, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="flex items-center gap-1 font-medium hover:underline">
              🌐 English (US)
            </button>
            <button type="button" className="flex items-center gap-1 font-medium hover:underline">
              $ USD
            </button>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
