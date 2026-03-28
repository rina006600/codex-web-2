'use client';

import type { CopyResult } from '@/types/copy';

interface ResultCardProps {
  result: CopyResult;
  onCopy: (text: string) => void;
}

export function ResultCard({ result, onCopy }: ResultCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-card p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          {result.tone}
        </span>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100"
          onClick={() => onCopy(result.text)}
        >
          복사
        </button>
      </div>
      <p className="text-base leading-relaxed text-ink">{result.text}</p>
    </article>
  );
}
