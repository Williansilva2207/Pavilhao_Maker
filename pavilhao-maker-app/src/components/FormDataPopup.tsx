
export default function FormDataPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-[32px] bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-zinc-950">Dados da solicitação</h2>
          <button type="button" className="text-zinc-500 hover:text-zinc-900" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="mt-6 space-y-4 text-sm text-zinc-700">
          <p><strong>Solicitante:</strong> Prof. Ana Maria</p>
          <p><strong>Espaço:</strong> Maker</p>
          <p><strong>Descrição:</strong> Workshop de prototipagem básica com impressoras 3D.</p>
          <p><strong>Status:</strong> Em análise</p>
        </div>
      </div>
    </div>
  );
}
