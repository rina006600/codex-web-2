import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Idea to Copy',
  description: 'Supabase Edge Functions 기반 데이터셋 마케팅 카피 생성기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
