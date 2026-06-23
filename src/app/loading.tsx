export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div
        className="size-8 animate-spin rounded-full border-2 border-border-default border-t-brand"
        aria-label="Loading"
      />
    </div>
  );
}
