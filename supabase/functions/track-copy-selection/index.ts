import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders, getRuntimeConfig } from '../_shared/runtime.ts';

type Channel = 'sns' | 'banner' | 'landing';
type PatternType = 'brand_mention' | 'problem_solution' | 'social_proof' | 'benefit_emphasis' | 'scarcity_cta';

interface TrackSelectionRequest {
  sessionId: string;
  generationId: string;
  selectedCopyText: string;
  selectedPatternType: PatternType;
  selectedToneLabel: string;
  selectedChannel: Channel;
  actionType: 'copy' | 'select';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Partial<TrackSelectionRequest>;

    if (!body.sessionId || !body.generationId || !body.selectedCopyText || !body.selectedPatternType || !body.selectedToneLabel || !body.selectedChannel || !body.actionType) {
      throw new Error('Missing required fields');
    }

    const { supabaseUrl, serviceRoleKey } = getRuntimeConfig(req);
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { error } = await supabase.from('copy_selection_history').insert({
      session_id: body.sessionId,
      generation_id: body.generationId,
      selected_copy_text: body.selectedCopyText,
      selected_pattern_type: body.selectedPatternType,
      selected_tone_label: body.selectedToneLabel,
      selected_channel: body.selectedChannel,
      action_type: body.actionType,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unexpected error',
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
