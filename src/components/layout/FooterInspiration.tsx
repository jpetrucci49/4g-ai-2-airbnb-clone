"use client";

import { Tabs } from "@/components/ui/Tabs";
import { inspirationLinks, inspirationTabs } from "@/data/footer";

interface FooterInspirationProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function FooterInspiration({ activeTab, onTabChange }: FooterInspirationProps) {
  const links = inspirationLinks[activeTab] ?? inspirationLinks.popular;

  return (
    <>
      <h2 className="mb-6 text-sm font-semibold">Inspiration for future getaways</h2>
      <Tabs tabs={inspirationTabs} activeId={activeTab} onChange={onTabChange} />
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {links.map((link) => (
          <a key={link.title} href="#" className="text-sm hover:underline">
            <span className="font-medium">{link.title}</span>
            <br />
            <span className="text-text-secondary">{link.subtitle}</span>
          </a>
        ))}
      </div>
      <button type="button" className="mt-4 text-sm font-semibold underline">
        Show more
      </button>
    </>
  );
}
