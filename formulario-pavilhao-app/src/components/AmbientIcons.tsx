
export default function AmbientIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <span className="material-symbols-outlined absolute left-[2%] top-[8%] text-[10rem] text-[var(--color-form-primary)] opacity-20 hover:opacity-80">
        precision_manufacturing
      </span>
      <span className="material-symbols-outlined absolute left-[6%] top-[40%] text-[8rem] text-[var(--color-form-primary-mid)] opacity-20 hover:opacity-80">
        view_in_ar
      </span>
      <span className="material-symbols-outlined absolute left-[1%] top-[60%] text-[10rem] text-zinc-900 opacity-10 hover:opacity-30">
        laser
      </span>
      <span className="material-symbols-outlined absolute right-[3%] top-[16%] text-[11rem] text-[var(--color-form-primary-dark)] opacity-12 hover:opacity-40">
        memory
      </span>
      <span className="material-symbols-outlined absolute right-[4%] top-[48%] text-[9rem] text-[var(--color-form-primary)] opacity-18 hover:opacity-40">
        handyman
      </span>
    </div>
  );
}
