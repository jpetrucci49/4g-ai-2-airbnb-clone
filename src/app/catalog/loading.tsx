export default function CatalogLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-bg-subtle" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square animate-pulse rounded-xl bg-bg-subtle" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-bg-subtle" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-bg-subtle" />
          </div>
        ))}
      </div>
    </div>
  );
}
