'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RootLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '123') {
      document.cookie = "auth_token=true; path=/";
      router.push('/triagem');
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-8 industrial-grid bg-[#f9f9fa]">
      
      {/* Ambientação lateral abstrata - ÍCONES GIGANTES FORÇADOS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <span className="material-symbols-outlined absolute left-[2%] top-[8%] text-[#c95a5a] -rotate-12 pointer-events-auto cursor-default transition-all duration-500 hover:opacity-40 ambient-icon" style={{ fontSize: '320px', opacity: 0.15 }}>precision_manufacturing</span>
        <span className="material-symbols-outlined absolute left-[15%] top-[34%] text-[#b94d4d] rotate-45 pointer-events-auto cursor-default transition-all duration-500 hover:opacity-40 ambient-icon" style={{ fontSize: '240px', opacity: 0.2 }}>view_in_ar</span>
        <span className="material-symbols-outlined absolute left-[2%] top-[58%] text-[#c95a5a] -rotate-15 pointer-events-auto cursor-default transition-all duration-500 hover:opacity-40 ambient-icon" style={{ fontSize: '280px', opacity: 0.18 }}>engineering</span>
        <span className="material-symbols-outlined absolute left-[15%] top-[82%] text-[#8b1e35] rotate-6 pointer-events-auto cursor-default transition-all duration-500 hover:opacity-40 ambient-icon" style={{ fontSize: '200px', opacity: 0.15 }}>build</span>

        <span className="material-symbols-outlined absolute right-[2%] top-[8%] text-[#8b1e35] rotate-12 pointer-events-auto cursor-default transition-all duration-500 hover:opacity-40 ambient-icon" style={{ fontSize: '320px', opacity: 0.15 }}>memory</span>
        <span className="material-symbols-outlined absolute right-[15%] top-[34%] text-[#c95a5a] -rotate-45 pointer-events-auto cursor-default transition-all duration-500 hover:opacity-40 ambient-icon" style={{ fontSize: '240px', opacity: 0.2 }}>handyman</span>
        <span className="material-symbols-outlined absolute right-[2%] top-[58%] text-zinc-800 -rotate-90 pointer-events-auto cursor-default transition-all duration-500 hover:opacity-40 ambient-icon" style={{ fontSize: '280px', opacity: 0.12 }}>settings</span>
        <span className="material-symbols-outlined absolute right-[15%] top-[82%] text-[#b94d4d] rotate-30 pointer-events-auto cursor-default transition-all duration-500 hover:opacity-40 ambient-icon" style={{ fontSize: '200px', opacity: 0.2 }}>cycle</span>

        <svg className="absolute left-0 top-0 w-64 h-full opacity-10 pointer-events-none" viewBox="0 0 200 800" fill="none">
          <rect x="20" y="100" width="40" height="2" fill="#c95a5a"/>
          <rect x="60" y="100" width="2" height="30" fill="#c95a5a"/>
          <rect x="60" y="130" width="25" height="2" fill="#c95a5a"/>
          <circle cx="85" cy="131" r="3" fill="#c95a5a"/>
        </svg>
      </div>

      {/* Container do login */}
      <div className="w-full max-w-md animate-fade-in-up relative z-10 flex flex-col items-center">
        <div className="text-center mb-8 mt-6 group login-header">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1e1e1e] to-zinc-800 shadow-xl mb-4 relative cursor-default">
            <span className="material-symbols-outlined text-4xl text-white">lock</span>
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#c95a5a] rounded-full flex items-center justify-center shadow">
              <span className="material-symbols-outlined text-white text-[14px]">fingerprint</span>
            </span>
          </div>
          <h2 className="font-space text-3xl font-bold text-zinc-800 login-title cursor-default">Acessar Painel</h2>
          <p className="text-zinc-500 mt-3 font-light font-inter">Entre com suas credenciais institucionais</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-zinc-100/50 backdrop-blur-sm white-card-hover w-full">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-[12px] font-bold text-zinc-500 mb-2 ml-1 uppercase tracking-widest font-space">
                NOME DE USUÁRIO OU EMAIL
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </span>
                <input 
                  type="text" 
                  placeholder="ex: pavilhao.mk@unicap.br" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 placeholder-zinc-400 transition-all login-input focus:bg-white outline-none font-inter" 
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-zinc-500 mb-2 ml-1 uppercase tracking-widest font-space">
                SENHA
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                  <span className="material-symbols-outlined text-[20px]">key</span>
                </span>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 placeholder-zinc-400 transition-all login-input focus:bg-white outline-none font-inter" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-zinc-600 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-[#c95a5a] focus:ring-[#c95a5a]" />
                <span className="font-inter">Lembrar-me</span>
              </label>
              <a href="#" className="text-[#c95a5a] hover:text-[#8b1e35] font-semibold transition-colors font-inter">Esqueceu a senha?</a>
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-[#1e1e1e] text-white font-bold rounded-xl login-btn tracking-widest font-space uppercase text-sm flex items-center justify-center gap-2"
            >
              <span>ENTRAR</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>
          <div className="mt-8 pt-5 border-t border-dashed border-zinc-200">
            <p className="text-center text-[11px] text-zinc-400 font-inter uppercase tracking-wider">
              Acesso restrito a técnicos e docentes autorizados
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-zinc-400 mt-4 font-inter uppercase tracking-widest whitespace-nowrap z-10">
        Pavilhão Maker © 2026 – Universidade Católica de Pernambuco
      </p>
    </main>
  );
}
