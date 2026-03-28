import type { CopyInput, GenerateCopyResponse, TrackCopySelectionPayload } from '@/types/copy';

interface GenerateCopyPayload extends CopyInput {
  sessionId: string;
}

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  };
}

async function invokeFunction<T>(functionName: string, body: unknown): Promise<T> {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

  const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error ?? `Failed to invoke function: ${functionName}`);
  }

  return json as T;
}

export async function generateCopy(payload: GenerateCopyPayload): Promise<GenerateCopyResponse> {
  const data = await invokeFunction<GenerateCopyResponse>('generate-copy', payload);

  if (!data?.results?.length || !data.generationId) {
    throw new Error('Invalid response received from generate-copy');
  }

  return data;
}

export async function trackCopySelection(payload: TrackCopySelectionPayload): Promise<void> {
  await invokeFunction('track-copy-selection', payload);
}
