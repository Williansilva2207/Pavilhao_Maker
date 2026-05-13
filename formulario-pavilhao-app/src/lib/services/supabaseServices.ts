import { supabase } from "../supabase";

export async function inputSolicitantes(name: string, email: string, number: string) {
  try {
    const { data: existing } = await supabase
      .from("solicitante")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      const { data: updated, error: updateError } = await supabase
        .from("solicitante")
        .update({ name, number })
        .eq("id", existing.id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      return updated.id;
    }

    const { data: inserted, error: insertError } = await supabase
      .from("solicitante")
      .insert({ name, email, number })
      .select()
      .single();

    if (insertError) throw insertError;
    return inserted.id;
  } catch (error: any) {
    console.error("Erro ao processar solicitante:", error.message || error);
    throw error;
  }
}

export async function inputForms(payload: {
  indor_space: string;
  machine?: string;
  event_name: string;
  description?: string;
  event_data: string;
  time_start: string;
  time_finished: string;
  id_solicitante: number;
  participants_count?: number;
  professor_name?: string;
  class_group?: string;
}) {
  try {
    const { data, error } = await supabase
      .from("forms")
      .insert({
        machine: '',
        participants_count: 0,
        professor_name: '',
        class_group: '',
        description: '',
        ...payload,
        status: true,
        confirmation: false
      });

    if (error) throw error;
    return "Formulário enviado com sucesso";
  } catch (error: any) {
    console.error("Erro ao enviar formulário:", error.message || error);
    throw error;
  }
}

export async function getConfirmedForms() {
  try {
    const { data, error } = await supabase
      .from("forms")
      .select("*, solicitante(name)")
      .eq("confirmation", true);

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("ERRO SUPABASE DETECTADO:", error.message);
    return [];
  }
}

export async function checkConflicts(space: string, date: string, start: string, end: string) {
  try {
    const { data, error } = await supabase
      .from("forms")
      .select("time_start, time_finished")
      .eq("indor_space", space)
      .eq("event_data", date)
      .eq("confirmation", true);

    if (error) throw error;

    const newStart = timeToMinutes(start);
    const newEnd = timeToMinutes(end);

    for (const event of data) {
      const exStart = timeToMinutes(event.time_start);
      const exEnd = timeToMinutes(event.time_finished);

      if (newStart < exEnd && newEnd > exStart) {
        return true; 
      }
    }
    return false;
  } catch (error) {
    console.error("Erro ao verificar conflitos:", error);
    return false;
  }
}

function timeToMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}
