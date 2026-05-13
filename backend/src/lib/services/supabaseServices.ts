import { supabase } from "@/lib/supabase";

export async function inputSolicitantes(name: string, email: string, number: string) {
  try{
    const { data, error } = await supabase
    .from("solicitations")
    .insert({
      name,
      email,
      number
    }).select().single();

    if (error) {
      throw error;
    }
    console.log("Solicitação enviada com sucesso");
    return data.id;
  }catch (error) {
    console.log("Erro ao enviar solicitação:", error);
    return "Infelizemente, não foi possível enviar a solicitação";
  }
}

export async function getAllSolicitantes() {
  try{
    const { data, error } = await supabase
      .from("solicitations")
      .select("name, email, number");
    if (error) {
      throw error;
    }
    return data;

  }catch (error) {
    console.log("Erro ao buscar solicitações:", error);
    return "Infelizemente, não foi possível buscar as solicitações";
  }
}

export async function inputForms(indor_space: string, machine: string, objective: string, event_data: Date, time_start: string, time_finished: string, id_solicitante: number) {
  try{
    const { error } = await supabase
    .from("forms")
    .insert({
      indor_space,
      machine,
      objective,
      event_data,
      time_start,
      time_finished,
      status: true,
      confirmation: false,
      id_solicitante
    });

    if (error) {
      throw error;
    }
    console.log("Formulário enviado com sucesso");
    return "Formulário enviado com sucesso";
  }catch (error) {
    console.log("Erro ao enviar formulário:", error);
    return "Infelizemente, não foi possível enviar o formulário";
  }
}
export async function getAllFormsFalse() {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("confirmation", false);

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllFormsTrue() {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("confirmation", true);

  if (error) {
    throw error;
  }

  return data;
}

export async function signUp(email: string, password: string, name: string, number: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    throw error;
  }

  const user = data.user;

  if (!user) {
    throw new Error("Usuário não criado");
  }

  const { error: adminError } = await supabase
    .from("admin")
    .insert({
      email,
      password,
      user_id: user.id,
      name,
      number
    });

  if (adminError) {
    throw adminError;
  }

  return user;
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }
}

