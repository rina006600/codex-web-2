import type { Tone } from '@/types/copy';

export const TONE_LABELS: Tone[] = ['감성', '직관', '고급', '트렌디', '설득'];

export const templates = {
  감성: [
    '{keyword}, 당신의 하루를 더 아름답게.',
    '마음을 움직이는 {keyword}의 순간.',
    '{keyword}로 오늘 분위기를 완성하세요.',
    '당신의 감성을 닮은 {keyword}.',
  ],
  직관: [
    '지금 필요한 건 바로 {keyword}.',
    '{keyword}, 가장 빠른 선택.',
    '간단하게 고르는 {keyword}.',
    '{keyword}로 바로 시작하세요.',
  ],
  고급: [
    '절제된 품격, {keyword}의 완성.',
    '{keyword}, 한 단계 높은 기준.',
    '깊이 있는 감각의 {keyword}.',
    '{keyword}로 완성하는 프리미엄 무드.',
  ],
  트렌디: [
    '요즘 감성의 중심, {keyword}.',
    '지금 가장 핫한 {keyword}를 만나보세요.',
    '{keyword}, 트렌드를 앞서가는 선택.',
    '요즘은 {keyword} 하나면 충분해.',
  ],
  설득: [
    '고민은 줄이고, {keyword}를 선택하세요.',
    '{keyword}, 선택해야 할 이유는 이미 충분합니다.',
    '지금 {keyword}를 고르면 후회하지 않습니다.',
    '{keyword}가 필요한 순간, 답은 하나입니다.',
  ],
} as const;
