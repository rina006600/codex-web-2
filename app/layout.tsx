import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Idea to Copy',
  description: '아이디어 한 줄로 5가지 톤의 마케팅 카피를 만드는 클라이언트 전용 앱',
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
