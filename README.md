# Idea to Copy

데이터셋 기반 마케팅 카피 생성 SaaS 프로토타입입니다. 프론트엔드는 **Next.js 16 App Router**로 구현되어 **Vercel 배포**에 최적화되어 있고, 비즈니스 로직은 전부 **Supabase Edge Functions**에서 처리합니다.

## 아키텍처

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS (Vercel)
- **Backend/API**: Supabase Edge Functions
  - `generate-copy`
  - `track-copy-selection`
- **Database**: Supabase Postgres
- **정책**: Next.js API Route로 비즈니스 로직을 처리하지 않음

## 핵심 기능

- Hero 타이틀: `Idea to Copy`
- 모바일 우선 chat-like 입력 UX
- 입력 필드
  - brand
  - target
  - situation
  - benefit
  - feature
  - channel (`sns`, `banner`, `landing`)
- `generate-copy` 호출로 정확히 5개의 카피 생성
- 5개 우선 패턴
  1. brand mention
  2. problem -> solution
  3. social proof
  4. benefit emphasis
  5. scarcity + CTA
- 카드별 `복사` / `사용하기`
  - 복사 시 토스트: `복사 했습니다`
  - 두 액션 모두 `track-copy-selection` 저장

## 프로젝트 구조

```txt
app/
components/
lib/
  copy-service.ts         # Supabase Edge Function 호출
  session.ts              # browser session id 관리
types/

supabase/
  config.toml
  migrations/
    202603280001_init_copy_schema.sql
  seed/
    seed_copy_data.sql
  functions/
    generate-copy/index.ts
    track-copy-selection/index.ts
```

## 환경 변수

`.env.local` 생성:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

> 루트 `.env.local`에는 브라우저에서 필요한 공개 값만 넣습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저: `http://localhost:3000`

## Supabase 설정

1. Supabase 프로젝트 생성
2. SQL Editor에서 마이그레이션 실행
   - `supabase/migrations/202603280001_init_copy_schema.sql`
3. 시드 데이터 실행
   - `supabase/seed/seed_copy_data.sql`
4. Edge Functions 배포

```bash
supabase login
supabase link --project-ref <YOUR_PROJECT_REF>
supabase functions deploy generate-copy --no-verify-jwt
supabase functions deploy track-copy-selection --no-verify-jwt
```

5. 함수 환경 변수 설정

```bash
supabase secrets set \
  OPENAI_API_KEY=OPTIONAL_FOR_FUTURE
```

> Supabase-hosted Edge Functions는 기본 시크릿으로 `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`를 제공합니다. 이 프로젝트는 함수 런타임에서 `SUPABASE_URL`을 우선 사용하고, 필요 시 요청 URL origin으로 fallback 합니다.

## Vercel 배포 가이드

1. GitHub 저장소를 Vercel에 Import
2. **Framework Preset: Next.js** 확인
3. Vercel Project Settings > Environment Variables 등록
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 배포
   - Build Command: `next build`
   - Output: Next.js default

> 이 프로젝트는 Next.js API Routes를 사용하지 않아도 Vercel에서 정상 배포됩니다.

## 생성 엔진 확장 포인트

`generate-copy` 함수에 전략 추상화가 있습니다.

- `dataset` 모드: 현재 기본 모드, DB 템플릿/룰 기반 생성
- `openai` 모드: 추후 OpenAI 연동 시 같은 응답 스키마 유지

응답 형식은 고정됩니다.

```json
{
  "generationId": "uuid",
  "results": [
    {
      "channel": "sns",
      "patternType": "brand_mention",
      "toneLabel": "감성형",
      "text": "..."
    }
  ]
}
```

## 운영 체크리스트

- 템플릿/룰 변경은 DB 데이터 수정으로 반영
- `copy_generation_history` / `copy_selection_history`로 사용 로그 분석
- RLS/권한 정책은 운영 정책에 맞게 강화 권장
- OpenAI 모드 활성화 시 `OPENAI_API_KEY`와 fallback 정책 추가 권장
