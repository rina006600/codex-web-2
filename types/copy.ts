export type Channel = 'sns' | 'banner' | 'landing';

export type PatternType =
  | 'brand_mention'
  | 'problem_solution'
  | 'social_proof'
  | 'benefit_emphasis'
  | 'scarcity_cta';

export interface CopyInput {
  brand: string;
  target: string;
  situation: string;
  benefit: string;
  feature: string;
  channel: Channel;
}

export interface CopyResult {
  channel: Channel;
  patternType: PatternType;
  toneLabel: string;
  text: string;
}

export interface GenerateCopyResponse {
  generationId: string;
  results: CopyResult[];
}

export interface TrackCopySelectionPayload {
  sessionId: string;
  generationId: string;
  selectedCopyText: string;
  selectedPatternType: PatternType;
  selectedToneLabel: string;
  selectedChannel: Channel;
  actionType: 'copy' | 'select';
}
