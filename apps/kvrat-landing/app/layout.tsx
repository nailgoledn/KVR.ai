import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KVRAT.ai',
  description: 'منصة ذكاء اصطناعي لتحويل الأفكار إلى مشاريع متكاملة',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
