
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen industrial-grid relative overflow-hidden flex items-center justify-center px-6 py-10">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 w-64 h-64 bg-[#c95a5a]/10 blur-3xl rounded-full"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#8b1e35]/10 blur-3xl rounded-full"></div>
        <span className="material-symbols-outlined absolute left-[2%] top-[8%] text-[10rem] text-[#c95a5a] ambient-icon">precision_manufacturing</span>
        <span className="material-symbols-outlined absolute right-[2%] top-[12%] text-[10rem] text-[#8b1e35] ambient-icon">memory</span>
      </div>

      <section className="relative z-10 w-full max-w-md rounded-[32px] border border-zinc-200 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-950 text-white shadow-xl">
            <span className="material-symbols-outlined text-4xl">lock</span>
          </div>
          <h1 className="text-3xl font-[var(--font-space)] font-black text-zinc-900">Acessar Painel</h1>
          <p className="mt-2 text-sm text-zinc-600">Entre com credenciais de demonstração.</p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push('/');
          }}
          className="space-y-6"
        >
          <label className="block text-sm font-semibold uppercase tracking-[0.15em] text-zinc-600">
            Usuário
            <input
              type="text"
              required
              placeholder="joao.silva@unicap.br"
              className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition hover:border-[#c95a5a]/80 focus:border-[#c95a5a]"
            />
          </label>

          <label className="block text-sm font-semibold uppercase tracking-[0.15em] text-zinc-600">
            Senha
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 pr-14 text-sm text-zinc-900 outline-none transition hover:border-[#c95a5a]/80 focus:border-[#c95a5a]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </label>

          <button
            type="submit"
            className="w-full rounded-3xl bg-gradient-to-r from-[#8b5000] to-[#ff9800] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition hover:brightness-110"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Acesso visual apenas, não há backend integrado.
        </p>
      </section>
    </main>
  );
}
