import { footerColumns } from "@/data/footer";

export function FooterColumns() {
  return (
    <div className="mt-10 grid gap-8 border-t border-border-default pt-8 md:grid-cols-3">
      {footerColumns.map((col) => (
        <div key={col.title}>
          <h3 className="mb-4 text-sm font-semibold">{col.title}</h3>
          <ul className="space-y-3">
            {col.links.map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-text-secondary hover:underline">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
