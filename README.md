# Idea to Copy

클라이언트 전용(서버/API 없음) 마케팅 카피 생성기입니다.

## 실행

```bash
npm install
npm run dev
```

## 배포 (Vercel)

- Next.js App Router 기반
- `next.config.ts`에서 `output: 'export'`로 정적 export 설정
- Vercel 프로젝트에 연결 후 기본 Build Command(`next build`)로 배포 가능

## 핵심 제약

- API Route 사용 안 함
- 서버 호출 없음
- 외부 AI 호출 없음
