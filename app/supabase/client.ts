import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

let supabaseClient: SupabaseClient | null = null;

export const createClerkSupabaseClient = (getToken: (options?: { template?: string }) => Promise<string | null>) => {
  // If the client is already created, return it
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey, {
    global: {
      fetch: async (url, options = {}) => {
        const clerkToken = await getToken({
          template: 'bookmark-manager',
        });

        const headers = new Headers(options?.headers);
        headers.set('Authorization', `Bearer ${clerkToken}`);

        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  });

  return supabaseClient;
};