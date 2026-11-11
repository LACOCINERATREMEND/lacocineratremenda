export function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

export async function supabaseRest(path: string, init?: RequestInit) {
  const current = supabaseConfig();
  if (!current) throw new Error("supabase_off");
  const response = await fetch(`${current.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: current.key,
      Authorization: `Bearer ${current.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init?.headers ?? {}),
    },
  });
  const text = await response.text();
  if (!response.ok) {
    console.error("supabase request failed", path, response.status, text);
    throw new Error(`supabase_${response.status}`);
  }
  if (!text) return [];
  return JSON.parse(text) as unknown;
}

export async function supabaseStorage(path: string, init?: RequestInit) {
  const current = supabaseConfig();
  if (!current) throw new Error("supabase_off");
  const response = await fetch(`${current.url}/storage/v1/${path}`, {
    ...init,
    headers: {
      apikey: current.key,
      Authorization: `Bearer ${current.key}`,
      ...(init?.headers ?? {}),
    },
  });
  const text = await response.text();
  if (!response.ok) {
    console.error("supabase storage failed", path, response.status, text);
    throw new Error(`supabase_storage_${response.status}`);
  }
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}
