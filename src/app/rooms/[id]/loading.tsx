export default function RoomLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="aspect-[2/1] animate-pulse rounded-xl bg-bg-subtle" />
      <div className="mt-8 h-8 w-2/3 animate-pulse rounded-lg bg-bg-subtle" />
      <div className="mt-4 h-4 w-1/3 animate-pulse rounded bg-bg-subtle" />
    </div>
  );
}
