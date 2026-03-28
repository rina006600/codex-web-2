'use client';

import { FormEvent } from 'react';

interface ChatInputProps {
  input: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function ChatInput({ input, onChange, onSubmit }: ChatInputProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-card">
      <div className="flex items-end gap-2">
        <input
          value={input}
          onChange={(event) => onChange(event.target.value)}
          placeholder="브랜드 / 타겟 / 상황 / 혜택 / 특징"
          className="min-h-11 w-full flex-1 rounded-xl bg-slate-50 px-3 py-2 outline-none ring-indigo-200 transition focus:ring-2"
          aria-label="구조화된 마케팅 아이디어 입력"
        />
        <button
          type="submit"
          className="h-11 shrink-0 rounded-xl bg-accent px-4 font-medium text-white transition hover:opacity-90"
        >
          생성
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-500">예시 형식대로 작성하면 결과 정확도가 높아집니다.</p>
    </form>
  );
}
