'use client';

import type { CopyResult } from '@/types/copy';

interface ResultCardProps {
  result: CopyResult;
  onCopy: (result: CopyResult) => void;
  onSelect: (result: CopyResult) => void;
}

const channelLabel: Record<CopyResult['channel'], string> = {
  sns: 'SNS',
  banner: '배너',
  landing: '랜딩',
};

const patternLabel: Record<CopyResult['patternType'], string> = {
  brand_mention: '브랜드 언급',
  problem_solution: '문제 → 해결',
  social_proof: '사회적 증거',
  benefit_emphasis: '혜택 강조',
  scarcity_cta: '희소성 + CTA',
};

export function ResultCard({ result, onCopy, onSelect }: ResultCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-card p-4 shadow-card">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{channelLabel[result.channel]}</span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{patternLabel[result.patternType]}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{result.toneLabel}</span>
      </div>

      <p className="mb-4 whitespace-pre-wrap text-base leading-relaxed text-ink">{result.text}</p>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          onClick={() => onCopy(result)}
        >
          복사
        </button>
        <button
          type="button"
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          onClick={() => onSelect(result)}
        >
          사용하기
        </button>
      </div>
    </article>
  );
}
