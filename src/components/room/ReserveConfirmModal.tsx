import { formatPrice } from "@/lib/utils";

interface ReserveConfirmModalProps {
  title: string;
  total: number;
  nights: number;
  onClose: () => void;
}

export function ReserveConfirmModal({ title, total, nights, onClose }: ReserveConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 md:items-center">
      <div className="w-full max-w-md rounded-t-2xl bg-white p-6 md:rounded-2xl">
        <h3 className="mb-2 text-lg font-semibold">Confirm reservation</h3>
        <p className="mb-4 text-sm text-text-secondary">
          Total: <strong>{formatPrice(total)}</strong> for {nights} nights at {title}
        </p>
        <button type="button" onClick={onClose} className="w-full rounded-lg bg-brand py-3 font-semibold text-white">
          Confirm
        </button>
      </div>
    </div>
  );
}
