
export default function SuccessToast({ open, message, onClose }: { open: boolean; message: string; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-3xl border border-green-200 bg-white px-5 py-4 shadow-2xl">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-green-600">check_circle</span>
        <p className="text-sm font-semibold text-zinc-900">{message}</p>
        <button type="button" onClick={onClose} className="text-zinc-400 hover:text-zinc-700">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
}
