'use client';

import { useMemo, useState } from 'react';
import { ChatInput } from '@/components/chat-input';
import { KeywordChips } from '@/components/keyword-chips';
import { ResultCard } from '@/components/result-card';
import { generateCopies, shouldShowInputHelper } from '@/lib/generator';
import type { CopyResult } from '@/types/copy';

const placeholders = [
  '감성적인 여성 의류 쇼핑몰 홍보 문구',
  '카페 오픈 이벤트 문구',
  '프리미엄 향수 런칭 카피',
  '전시 오프닝 홍보 문구',
];

const autocompleteMap: Record<string, string[]> = {
  카페: ['감성 카페', '브런치 카페', '프리미엄 카페'],
};

export function ChatContainer() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<CopyResult[]>([]);
  const [loading, setLoading] = useState(false);

  const randomPlaceholder = useMemo(
    () => placeholders[Math.floor(Math.random() * placeholders.length)],
    [],
  );

  const suggestions = useMemo(() => {
    const keyword = Object.keys(autocompleteMap).find((key) => input.includes(key));
    return keyword ? autocompleteMap[keyword] : [];
  }, [input]);

  const handleGenerate = () => {
    if (!input.trim()) return;
    setLoading(true);
    const generated = generateCopies(input);
    setResults(generated);
    setLoading(false);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleCopyAll = async () => {
    const allText = results.map((result) => `[${result.tone}] ${result.text}`).join('\n');
    await navigator.clipboard.writeText(allText);
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col bg-background px-4 pb-32 pt-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Idea to Copy</h1>
        <p className="mt-2 text-sm text-muted">아이디어 한 줄로 5가지 톤의 마케팅 카피를 만들어보세요.</p>
      </header>

      <section className="mb-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-sm text-indigo-900">
        브랜드 + 상황 + 느낌을 함께 적어보세요
      </section>

      <section className="mb-4">
        <KeywordChips onSelect={(keyword) => setInput((prev) => `${prev} ${keyword}`.trim())} />
      </section>

      {suggestions.length > 0 && (
        <section className="mb-4">
          <p className="mb-2 text-xs font-medium text-slate-500">추천 자동완성</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm"
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </section>
      )}

      {shouldShowInputHelper(input) && (
        <p className="mb-4 text-sm text-amber-700">조금 더 구체적으로 작성하면 더 좋은 결과를 만들 수 있어요.</p>
      )}

      <section className="mb-6 flex-1 space-y-3 overflow-y-auto">
        {results.map((result) => (
          <ResultCard key={result.tone} result={result} onCopy={handleCopy} />
        ))}
      </section>

      {results.length > 0 && (
        <section className="mb-4 flex gap-2">
          <button
            onClick={handleCopyAll}
            type="button"
            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium"
          >
            전체 복사
          </button>
          <button
            onClick={handleGenerate}
            type="button"
            className="flex-1 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            다시 생성
          </button>
        </section>
      )}

      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-background/95 p-4 backdrop-blur">
        <div className="mx-auto w-full max-w-2xl">
          <ChatInput input={input} onChange={setInput} onSubmit={handleGenerate} placeholder={randomPlaceholder} />
          {loading && <p className="mt-2 text-xs text-slate-500">문구 생성 중...</p>}
        </div>
      </div>
    </main>
  );
}
