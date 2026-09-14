import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_PULSE_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_PULSE_SUPABASE_ANON_KEY!;

export const pulseClient = createClient(url, anonKey);

export const PULSE_EVENT_ID = process.env.NEXT_PUBLIC_PULSE_EVENT_ID!;
