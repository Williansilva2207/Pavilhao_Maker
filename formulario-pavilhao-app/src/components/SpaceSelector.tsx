
export default function SpaceSelector({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {['Pavilhão', 'Maker'].map((option) => (
        <label key={option} className="cursor-pointer">
          <input
            type="radio"
            name="espaco"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="peer sr-only"
          />
          <div className="rounded-3xl border border-white/30 bg-white/10 p-6 text-white transition peer-checked:bg-white peer-checked:text-zinc-950 peer-checked:shadow-[0_0_30px_rgba(255,180,120,0.7)] hover:-translate-y-1 hover:bg-white/20">
            <h3 className="text-xl font-[var(--font-space)]">Espaço {option}</h3>
            <p className="mt-2 text-sm text-zinc-100/80">
              {option === 'Pavilhão' ? 'Lounge / Co-work para eventos' : 'Presencial com maquinário especializado'}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}
