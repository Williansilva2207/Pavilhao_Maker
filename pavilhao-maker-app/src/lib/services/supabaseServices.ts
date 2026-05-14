import { supabase } from '../supabase';

export async function getPendingRequests() {
  try {
    const { data, error } = await supabase
      .from('forms')
      .select('*, solicitante(name, email, number)')
      .eq('confirmation', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error fetching pending requests:', error.message);
    return [];
  }
}

export async function getConfirmedRequests() {
  try {
    const { data, error } = await supabase
      .from('forms')
      .select('*, solicitante(name)')
      .eq('confirmation', true)
      .order('event_data', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error fetching confirmed requests:', error.message);
    return [];
  }
}

export async function approveRequest(id: number) {
  try {
    const { data, error } = await supabase
      .from('forms')
      .update({ confirmation: true })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error approving request:', error.message);
    throw error;
  }
}

export async function rejectRequest(id: number) {
  try {
    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error('Error rejecting request:', error.message);
    throw error;
  }
}

export async function getDashboardStats() {
  try {
    const { data: allData, error } = await supabase
      .from('forms')
      .select('confirmation');

    if (error) throw error;

    const total = allData.length;
    const pending = allData.filter(d => !d.confirmation).length;
    const approved = allData.filter(d => d.confirmation).length;
    const rate = total > 0 ? Math.round((approved / total) * 100) : 0;

    return {
      total,
      pending,
      approved,
      rate: `${rate}%`
    };
  } catch (error: any) {
    console.error('Error fetching stats:', error.message);
    return { total: 0, pending: 0, approved: 0, rate: '0%' };
  }
}

export async function createRequest(formData: {
  name: string;
  email: string;
  number: string;
  event_data: string;
  time_start: string;
  time_finished: string;
  activity_type: string;
  event_name: string;
  description: string;
}) {
  try {
    let solicitanteId = null;
    
    // Check if solicitante exists
    const { data: existingUser } = await supabase
      .from('solicitante')
      .select('id')
      .eq('email', formData.email)
      .single();
      
    if (existingUser) {
      solicitanteId = existingUser.id;
    } else {
      const { data: newUser, error: userError } = await supabase
        .from('solicitante')
        .insert({
          name: formData.name,
          email: formData.email,
          number: formData.number
        })
        .select()
        .single();
        
      if (userError) throw userError;
      solicitanteId = newUser.id;
    }

    const { data: form, error: formError } = await supabase
      .from('forms')
      .insert({
        id_solicitante: solicitanteId,
        event_data: formData.event_data,
        time_start: formData.time_start,
        time_finished: formData.time_finished,
        activity_type: formData.activity_type,
        event_name: formData.event_name,
        description: formData.description,
        confirmation: false
      })
      .select()
      .single();

    if (formError) throw formError;
    return form;
  } catch (error: any) {
    console.error('Error creating request:', error.message);
    throw error;
  }
}
