"use client";

import { useState } from "react";
import { FooterBottom } from "@/components/layout/FooterBottom";
import { FooterColumns } from "@/components/layout/FooterColumns";
import { FooterInspiration } from "@/components/layout/FooterInspiration";

export function Footer() {
  const [activeTab, setActiveTab] = useState("popular");

  return (
    <footer className="mt-auto border-t border-border-light bg-bg-subtle md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <FooterInspiration activeTab={activeTab} onTabChange={setActiveTab} />
        <FooterColumns />
      </div>
      <FooterBottom />
    </footer>
  );
}
