import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/['"]+/g, '').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '').trim()!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.replace(/['"]+/g, '').trim()!;

console.log("Supabase URL:", supabaseUrl ? "Present" : "Missing");
if (supabaseUrl && !supabaseUrl.startsWith('https://')) {
  console.error("ERRO: NEXT_PUBLIC_SUPABASE_URL deve começar com https://");
}
console.log("Supabase Key:", supabaseKey ? "Present" : "Missing");

if (!supabaseUrl || !supabaseKey) {
  console.warn("CRITICAL: Supabase credentials missing in .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
