import type { ParsedInput, PatternKey } from '@/types/copy';

interface PatternArgs {
  data: ParsedInput;
  channelLine: string;
}

type PatternBuilder = (args: PatternArgs) => string;

export const channelToneLine = {
  SNS: '요즘 감성에 맞춰 짧고 부드럽게 전해요.',
  배너: '한눈에 들어오는 강한 한 줄로 전달해요.',
  랜딩: '자세한 설명으로 설득력 있게 안내해요.',
} as const;

export const patterns: Record<PatternKey, PatternBuilder[]> = {
  brand: [
    ({ data, channelLine }) =>
      `${data.brand}에서 시작되는 새로운 기준. ${data.target}를 위한 ${data.feature} 경험, ${channelLine}`,
  ],
  problemSolution: [
    ({ data, channelLine }) =>
      `${data.situation}에서 무엇을 보여줘야 할지 고민되나요? 이제 ${data.brand}의 ${data.feature} 솔루션으로 해결하세요. ${channelLine}`,
  ],
  socialProof: [
    ({ data, channelLine }) =>
      `이미 많은 사람들이 선택한 ${data.brand}. ${data.target}에게 검증된 이유를 ${data.situation}에서 직접 확인해보세요. ${channelLine}`,
  ],
  benefit: [
    ({ data, channelLine }) =>
      `지금 ${data.benefit}, 놓치지 마세요. ${data.brand}의 ${data.feature} 제안을 ${data.target}에게 가장 좋은 타이밍에 전하세요. ${channelLine}`,
  ],
  scarcityCta: [
    ({ data, channelLine }) =>
      `지금 아니면 놓치는 ${data.benefit}. ${data.brand}와 함께 ${data.situation} 기회를 잡고, 지금 바로 경험해보세요. ${channelLine}`,
  ],
};
