'use client';

import { FormEvent } from 'react';

interface ChatInputProps {
  input: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function ChatInput({ input, placeholder, onChange, onSubmit }: ChatInputProps) {
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
          placeholder={placeholder}
          className="min-h-11 w-full flex-1 rounded-xl bg-slate-50 px-3 py-2 outline-none ring-indigo-200 transition focus:ring-2"
          aria-label="마케팅 아이디어 입력"
        />
        <button
          type="submit"
          className="h-11 shrink-0 rounded-xl bg-accent px-4 font-medium text-white transition hover:opacity-90"
        >
          생성
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-500">Enter 키로 빠르게 생성할 수 있어요.</p>
    </form>
  );
}
