import { localStore } from "@/lib/storage/local";
import { supabaseStore } from "@/lib/storage/supabase";
import type { DataStore } from "@/lib/storage/types";

export function supabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getStore(): DataStore {
  return supabaseConfigured() ? supabaseStore : localStore;
}

export function storageLabel() {
  return supabaseConfigured() ? "supabase" : "local";
}
