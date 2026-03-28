export type Tone = '감성' | '직관' | '고급' | '트렌디' | '설득';

export interface CopyResult {
  tone: Tone;
  text: string;
}
