export type Channel = 'SNS' | '배너' | '랜딩';

export type ToneLabel = '감성형' | '직관형' | '설득형';

export type PatternKey = 'brand' | 'problemSolution' | 'socialProof' | 'benefit' | 'scarcityCta';

export interface ParsedInput {
  brand: string;
  target: string;
  situation: string;
  benefit: string;
  feature: string;
}

export interface CopyResult {
  id: number;
  channel: Channel;
  tone: ToneLabel;
  pattern: PatternKey;
  text: string;
}
