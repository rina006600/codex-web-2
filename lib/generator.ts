import { parseInput } from '@/lib/parser';
import { channelToneLine, patterns } from '@/lib/templates';
import type { Channel, CopyResult, PatternKey, ToneLabel } from '@/types/copy';

const generationPlan: Array<{ channel: Channel; tone: ToneLabel; pattern: PatternKey }> = [
  { channel: 'SNS', tone: '감성형', pattern: 'brand' },
  { channel: '배너', tone: '직관형', pattern: 'problemSolution' },
  { channel: '랜딩', tone: '설득형', pattern: 'socialProof' },
  { channel: '배너', tone: '직관형', pattern: 'benefit' },
  { channel: 'SNS', tone: '감성형', pattern: 'scarcityCta' },
];

export function generateCopies(input: string): CopyResult[] {
  const data = parseInput(input);

  return generationPlan.map((plan, index) => {
    const template = patterns[plan.pattern][0];

    return {
      id: index + 1,
      channel: plan.channel,
      tone: plan.tone,
      pattern: plan.pattern,
      text: template({
        data,
        channelLine: channelToneLine[plan.channel],
      }),
    };
  });
}
