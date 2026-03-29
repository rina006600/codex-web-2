'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChatInput } from '@/components/chat-input';
import { Guide } from '@/components/guide';
import { Hero } from '@/components/hero';
import { ResultCard } from '@/components/result-card';
import { Toast } from '@/components/toast';
import { generateCopy, trackCopySelection } from '@/lib/copy-service';
import { getOrCreateSessionId } from '@/lib/session';
import type { CopyInput, CopyResult } from '@/types/copy';

const initialInput: CopyInput = {
  brand: '',
  target: '',
  situation: '',
  benefit: '',
  feature: '',
  channel: 'sns',
};

export function ChatContainer() {
  const [values, setValues] = useState<CopyInput>(initialInput);
  const [results, setResults] = useState<CopyResult[]>([]);
  const [generationId, setGenerationId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState(false);
  const inputSectionRef = useRef<HTMLDivElement | null>(null);

  const isValid = useMemo(
    () => Object.values(values).every((value) => (typeof value === 'string' ? value.trim().length > 0 : Boolean(value))),
    [values],
  );

  const handleFieldChange = <K extends keyof CopyInput>(field: K, value: CopyInput[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const showCopiedToast = () => {
    setToastVisible(true);
    window.setTimeout(() => {
      setToastVisible(false);
    }, 1500);
  };

  const handleGenerate = async () => {
    if (!isValid) {
      setErrorMessage('모든 입력 항목을 작성해주세요.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const sessionId = getOrCreateSessionId();
      const response = await generateCopy({
        ...values,
        sessionId,
      });

      setResults(response.results);
      setGenerationId(response.generationId);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('generate-copy request failed', error);
      }
      setErrorMessage(error instanceof Error ? error.message : '카피 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (result: CopyResult) => {
    await navigator.clipboard.writeText(result.text);
    showCopiedToast();

    if (!generationId) return;

    try {
      await trackCopySelection({
        sessionId: getOrCreateSessionId(),
        generationId,
        selectedCopyText: result.text,
        selectedPatternType: result.patternType,
        selectedToneLabel: result.toneLabel,
        selectedChannel: result.channel,
        actionType: 'copy',
      });
    } catch {
      // Non-blocking analytics event
    }
  };

  const handleSelect = async (result: CopyResult) => {
    if (!generationId) return;

    try {
      await trackCopySelection({
        sessionId: getOrCreateSessionId(),
        generationId,
        selectedCopyText: result.text,
        selectedPatternType: result.patternType,
        selectedToneLabel: result.toneLabel,
        selectedChannel: result.channel,
        actionType: 'select',
      });
    } catch {
      // Non-blocking analytics event
    }
  };

  useEffect(() => {
    if (!results.length || !inputSectionRef.current) {
      return;
    }

    inputSectionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [results]);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col bg-background px-4 pb-6 pt-10">
      <Hero />
      <Guide />

      <section className="mb-6 flex-1 space-y-3">
        {results.map((result, index) => (
          <ResultCard key={`${result.patternType}-${index}`} result={result} onCopy={handleCopy} onSelect={handleSelect} />
        ))}
      </section>

      <div
        ref={inputSectionRef}
        className="sticky bottom-0 z-10 mt-auto border-t border-slate-200 bg-background/95 px-0 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur"
      >
        <div className="mx-auto w-full max-w-4xl">
          <ChatInput
            values={values}
            onChange={handleFieldChange}
            onSubmit={handleGenerate}
            disabled={loading}
            errorMessage={errorMessage}
          />
        </div>
      </div>

      <Toast message="복사 했습니다" visible={toastVisible} />
    </main>
  );
}
