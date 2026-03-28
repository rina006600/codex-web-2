'use client';

import { useState } from 'react';
import { ChatInput } from '@/components/chat-input';
import { Guide } from '@/components/guide';
import { Hero } from '@/components/hero';
import { ResultCard } from '@/components/result-card';
import { Toast } from '@/components/toast';
import { generateCopies } from '@/lib/generator';
import type { CopyResult } from '@/types/copy';

export function ChatContainer() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<CopyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleGenerate = () => {
    if (!input.trim()) return;

    setLoading(true);
    const generated = generateCopies(input);
    setResults(generated);
    setLoading(false);
  };

  const showCopiedToast = () => {
    setToastVisible(true);
    window.setTimeout(() => {
      setToastVisible(false);
    }, 1500);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    showCopiedToast();
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col bg-background px-4 pb-36 pt-10 md:pb-40">
      <Hero />
      <Guide />

      <section className="mb-6 flex-1 space-y-3 overflow-y-auto">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} onCopy={handleCopy} />
        ))}
      </section>

      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-background/95 p-4 backdrop-blur">
        <div className="mx-auto w-full max-w-4xl">
          <ChatInput input={input} onChange={setInput} onSubmit={handleGenerate} />
          {loading && <p className="mt-2 text-xs text-slate-500">문구 생성 중...</p>}
        </div>
      </div>

      <Toast message="복사 했습니다" visible={toastVisible} />
    </main>
  );
}
