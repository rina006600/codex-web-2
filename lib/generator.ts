import { templates, TONE_LABELS } from '@/lib/templates';
import { pickRandom } from '@/lib/utils';
import type { CopyResult } from '@/types/copy';

export function extractKeyword(input: string): string {
  const cleaned = input.trim().replace(/\s+/g, ' ');
  if (!cleaned) return '브랜드';

  const words = cleaned.split(' ');
  if (words.length === 1) return words[0];

  return words.slice(-2).join(' ');
}

export function generateCopies(input: string): CopyResult[] {
  const keyword = extractKeyword(input);

  return TONE_LABELS.map((tone) => {
    const template = pickRandom(templates[tone]);
    return {
      tone,
      text: template.replace('{keyword}', keyword),
    };
  });
}

export function shouldShowInputHelper(input: string): boolean {
  return input.trim().length > 0 && input.trim().length < 3;
}
