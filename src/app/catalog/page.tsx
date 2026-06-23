import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catalog",
};

export default function CatalogPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
      <h1 className="text-2xl font-semibold">Catalog</h1>
      <p className="mt-2 text-text-secondary">
        Search results page — coming soon.
      </p>
      <Link href="/" className="mt-6 inline-block text-sm text-brand hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
