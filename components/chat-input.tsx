'use client';

import { FormEvent } from 'react';
import type { Channel, CopyInput } from '@/types/copy';

interface ChatInputProps {
  values: CopyInput;
  onChange: <K extends keyof CopyInput>(field: K, value: CopyInput[K]) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const prompts: Array<{ key: keyof CopyInput; label: string; placeholder: string }> = [
  { key: 'brand', label: '브랜드는 무엇인가요?', placeholder: '예: 루나 스튜디오' },
  { key: 'target', label: '누구를 위한 문구인가요?', placeholder: '예: 20대 직장인 여성' },
  { key: 'situation', label: '어떤 상황에서 쓰나요?', placeholder: '예: 신제품 런칭 이벤트' },
  { key: 'benefit', label: '핵심 혜택은 무엇인가요?', placeholder: '예: 첫 구매 20% 할인' },
  { key: 'feature', label: '강조할 특징은 무엇인가요?', placeholder: '예: 3분 완성, 비건 성분' },
];

const channels: Array<{ value: Channel; label: string }> = [
  { value: 'sns', label: 'SNS' },
  { value: 'banner', label: '배너' },
  { value: 'landing', label: '랜딩' },
];

export function ChatInput({ values, onChange, onSubmit, disabled = false }: ChatInputProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-card">
      {prompts.map((prompt) => (
        <div key={prompt.key} className="space-y-1 rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-700">{prompt.label}</p>
          <input
            value={values[prompt.key]}
            onChange={(event) => onChange(prompt.key, event.target.value)}
            placeholder={prompt.placeholder}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-200 transition focus:ring-2"
            disabled={disabled}
          />
        </div>
      ))}

      <div className="rounded-xl bg-slate-50 p-3">
        <p className="mb-2 text-xs font-semibold text-slate-700">어떤 채널용 카피가 필요하신가요?</p>
        <div className="grid grid-cols-3 gap-2">
          {channels.map((channel) => (
            <button
              key={channel.value}
              type="button"
              onClick={() => onChange('channel', channel.value)}
              className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                values.channel === channel.value
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : 'border-slate-300 bg-white text-slate-700'
              }`}
              disabled={disabled}
            >
              {channel.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="h-11 w-full rounded-xl bg-accent px-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {disabled ? '생성 중...' : '카피 5개 생성'}
      </button>
    </form>
  );
}
