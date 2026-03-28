import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

type Channel = 'sns' | 'banner' | 'landing';
type PatternType = 'brand_mention' | 'problem_solution' | 'social_proof' | 'benefit_emphasis' | 'scarcity_cta';

interface GenerateCopyRequest {
  brand: string;
  target: string;
  situation: string;
  benefit: string;
  feature: string;
  channel: Channel;
  sessionId: string;
  mode?: 'dataset' | 'openai';
}

interface CopyResult {
  channel: Channel;
  patternType: PatternType;
  toneLabel: string;
  text: string;
}

interface TemplateRow {
  channel: Channel;
  pattern_type: PatternType;
  tone_label: string;
  template_text: string;
  priority: number;
}

interface RuleRow {
  pattern_type: PatternType;
  channel_tone_map: Record<Channel, string>;
  priority: number;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const requiredPatterns: PatternType[] = [
  'brand_mention',
  'problem_solution',
  'social_proof',
  'benefit_emphasis',
  'scarcity_cta',
];

function validateRequest(body: Partial<GenerateCopyRequest>): asserts body is GenerateCopyRequest {
  const requiredKeys: Array<keyof GenerateCopyRequest> = ['brand', 'target', 'situation', 'benefit', 'feature', 'channel', 'sessionId'];
  for (const key of requiredKeys) {
    if (!body[key] || (typeof body[key] === 'string' && String(body[key]).trim().length === 0)) {
      throw new Error(`Missing required field: ${key}`);
    }
  }
}

function applyTemplate(template: string, input: GenerateCopyRequest) {
  return template
    .replaceAll('{brand}', input.brand)
    .replaceAll('{target}', input.target)
    .replaceAll('{situation}', input.situation)
    .replaceAll('{benefit}', input.benefit)
    .replaceAll('{feature}', input.feature)
    .replace(/\s+/g, ' ')
    .trim();
}

interface GenerationStrategy {
  generate(args: {
    request: GenerateCopyRequest;
    templates: TemplateRow[];
    rules: RuleRow[];
  }): CopyResult[];
}

class DatasetGenerationStrategy implements GenerationStrategy {
  generate({ request, templates, rules }: { request: GenerateCopyRequest; templates: TemplateRow[]; rules: RuleRow[] }): CopyResult[] {
    return requiredPatterns.map((pattern) => {
      const sortedTemplates = templates
        .filter((template) => template.pattern_type === pattern)
        .sort((a, b) => a.priority - b.priority);

      const template = sortedTemplates[0];
      const rule = rules.find((item) => item.pattern_type === pattern);
      if (!template || !rule) {
        throw new Error(`Missing template/rule for pattern: ${pattern}`);
      }

      return {
        channel: request.channel,
        patternType: pattern,
        toneLabel: rule.channel_tone_map[request.channel] ?? template.tone_label,
        text: applyTemplate(template.template_text, request),
      };
    });
  }
}

class OpenAIGenerationStrategy implements GenerationStrategy {
  generate(): CopyResult[] {
    throw new Error('openai mode is not enabled yet');
  }
}

const strategies: Record<'dataset' | 'openai', GenerationStrategy> = {
  dataset: new DatasetGenerationStrategy(),
  openai: new OpenAIGenerationStrategy(),
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body: Partial<GenerateCopyRequest> = await req.json();
    validateRequest(body);

    const mode = body.mode ?? 'dataset';
    const supabase = createClient(
      Deno.env.get('NEXT_PUBLIC_SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const [templatesRes, rulesRes] = await Promise.all([
      supabase
        .from('copy_templates')
        .select('channel, pattern_type, tone_label, template_text, priority')
        .eq('channel', body.channel)
        .eq('active', true),
      supabase
        .from('copy_pattern_rules')
        .select('pattern_type, channel_tone_map, priority')
        .eq('active', true),
    ]);

    if (templatesRes.error) throw templatesRes.error;
    if (rulesRes.error) throw rulesRes.error;

    const results = strategies[mode].generate({
      request: body,
      templates: templatesRes.data ?? [],
      rules: (rulesRes.data ?? []).sort((a, b) => a.priority - b.priority),
    });

    if (results.length !== 5) {
      throw new Error(`Generation engine returned ${results.length} results (expected 5)`);
    }

    const historyPayload = {
      session_id: body.sessionId,
      request_payload: body,
      requested_channel: body.channel,
      generation_mode: mode,
      generated_results: results,
    };

    const historyInsert = await supabase
      .from('copy_generation_history')
      .insert(historyPayload)
      .select('id')
      .single();

    if (historyInsert.error) throw historyInsert.error;

    return new Response(
      JSON.stringify({
        generationId: historyInsert.data.id,
        results,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
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
