"use client";

import { useState } from "react";
import { signUp } from "@/lib/services/supabaseServices";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    try {
      await signUp(email, password, name, number);
      console.log("Admin criado com sucesso");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      <h1>Registro</h1>
      <input
        type="text"
        placeholder="Nome"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Número"
        onChange={(e) => setNumber(e.target.value)}
        required
      />
    
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </button>

    </div>
  );
}