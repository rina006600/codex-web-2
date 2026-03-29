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

async function parseJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    if (!response.ok) {
      throw new Error(text);
    }

    throw new Error('Supabase function returned a non-JSON response');
  }
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

  const json = await parseJsonResponse(response);

  if (!response.ok) {
    const errorMessage =
      json && typeof json.error === 'string' ? json.error : `Failed to invoke function: ${functionName}`;
    throw new Error(errorMessage);
  }

  if (!json) {
    throw new Error(`Supabase function returned an empty response: ${functionName}`);
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
