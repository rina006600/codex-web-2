import type { ParsedInput } from '@/types/copy';

const DEFAULT_VALUE = '미정';

function normalizeSegment(segment: string): string {
  return segment.trim().replace(/\s+/g, ' ');
}

export function parseInput(input: string): ParsedInput {
  const normalized = input
    .trim()
    .replace(/[|,]+/g, '/')
    .split('/')
    .map(normalizeSegment)
    .filter(Boolean);

  const [brand, target, situation, benefit, feature] = normalized;

  return {
    brand: brand ?? DEFAULT_VALUE,
    target: target ?? DEFAULT_VALUE,
    situation: situation ?? DEFAULT_VALUE,
    benefit: benefit ?? DEFAULT_VALUE,
    feature: feature ?? DEFAULT_VALUE,
  };
}
