export function Guide() {
  return (
    <section className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-sm text-indigo-950">
      <p className="font-semibold">좋은 결과를 위해 아래 내용을 함께 작성해보세요:</p>
      <ul className="mt-3 list-inside list-disc space-y-1">
        <li>브랜드명</li>
        <li>타겟 고객</li>
        <li>상황 (런칭 / 이벤트 / 홍보 등)</li>
        <li>제공 혜택 (할인 / 무료 / 증정 등)</li>
        <li>브랜드 특징</li>
      </ul>
      <p className="mt-3 rounded-xl bg-white/80 px-3 py-2 text-xs text-indigo-900">
        예: &quot;루나 스튜디오 / 20대 여성 / 신상 런칭 / 첫 구매 20% 할인 / 감성적인 무드&quot;
      </p>
    </section>
  );
}
