import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Airbnb Clone</h1>
      <p className="max-w-md text-center text-text-secondary">
        Next.js 16 scaffold — home page coming soon.
      </p>
      <nav className="flex gap-4 text-sm font-medium">
        <Link href="/catalog" className="text-brand hover:underline">
          Catalog
        </Link>
        <Link href="/rooms/1" className="text-brand hover:underline">
          Sample room
        </Link>
      </nav>
    </main>
  );
}
