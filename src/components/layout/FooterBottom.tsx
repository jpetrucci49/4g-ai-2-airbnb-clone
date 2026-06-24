export function FooterBottom() {
  return (
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
  );
}
