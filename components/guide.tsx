export function Guide() {
  return (
    <section className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-sm text-indigo-950">
      <h2 className="text-base font-bold">입력 가이드 (정확히 작성할수록 결과가 좋아집니다)</h2>
      <ul className="mt-3 list-inside list-disc space-y-1">
        <li>
          <span className="font-semibold">brand:</span> 사용자에게 각인시키고 싶은 브랜드명
        </li>
        <li>
          <span className="font-semibold">target:</span> 성별/연령/직업/관심사를 포함한 핵심 타겟
        </li>
        <li>
          <span className="font-semibold">situation:</span> 런칭, 시즌 행사, 신규 유입 캠페인 등 사용 맥락
        </li>
        <li>
          <span className="font-semibold">benefit:</span> 할인율, 무료 혜택, 기간 한정 보상 등 구체적 혜택
        </li>
        <li>
          <span className="font-semibold">feature:</span> 제품/서비스의 차별화 포인트
        </li>
        <li>
          <span className="font-semibold">channel:</span> sns, banner, landing 중 노출 위치에 맞게 선택
        </li>
      </ul>
      <p className="mt-3 rounded-xl bg-white/80 px-3 py-2 text-xs text-indigo-900">
        예시: 브랜드=루나핏 / 타겟=퇴근 후 홈트하는 2030 여성 / 상황=신규 구독 런칭 / 혜택=첫 달 50% 할인 /
        특징=AI 자세 코칭
      </p>
    </section>
  );
}
