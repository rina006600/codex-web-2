'use client';

const keywords = ['감성', '고급', '트렌디', '이벤트', '런칭'];

interface KeywordChipsProps {
  onSelect: (value: string) => void;
}

export function KeywordChips({ onSelect }: KeywordChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword) => (
        <button
          key={keyword}
          type="button"
          onClick={() => onSelect(keyword)}
          className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm text-indigo-700 transition hover:bg-indigo-100"
        >
          #{keyword}
        </button>
      ))}
    </div>
  );
}
