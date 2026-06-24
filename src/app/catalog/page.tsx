import { Suspense } from "react";
import { CatalogPageContent } from "@/components/pages/CatalogPageContent";

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading catalog...</div>}>
      <CatalogPageContent />
    </Suspense>
  );
}
