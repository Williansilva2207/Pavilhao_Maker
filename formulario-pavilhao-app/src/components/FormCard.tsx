
import type { ReactNode } from 'react';

export default function FormCard({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border-l-8 border-black bg-gradient-to-br from-[var(--color-form-primary)] via-[var(--color-form-primary-mid)] to-[var(--color-form-primary-dark)] p-10 text-white shadow-2xl">
      <div className="relative">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/20 blur-3xl" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
