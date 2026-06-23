import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-text-secondary">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
      >
        Go home
      </Link>
    </main>
  );
}
