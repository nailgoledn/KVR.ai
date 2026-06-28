'use client';

import { useRouter } from 'next/navigation';

export default function CTA() {
  const router = useRouter();

  return (
    <section
      style={{
        maxWidth: 1200,
        margin: '100px auto',
        padding: '80px 40px',
        background: 'linear-gradient(135deg,#0F172A,#1E293B)',
        borderRadius: 24,
        textAlign: 'center',
        border: '1px solid #334155',
      }}
    >
      <h2
        style={{
          fontSize: 46,
          color: '#fff',
          marginBottom: 20,
        }}
      >
        ابدأ رحلتك مع KVRAT.ai
      </h2>

      <p
        style={{
          color: '#CBD5E1',
          fontSize: 20,
          maxWidth: 800,
          margin: '0 auto 40px',
          lineHeight: 1.8,
        }}
      >
        حول فكرتك إلى مشروع حقيقي باستخدام الذكاء الاصطناعي، من التخطيط وحتى
        إنشاء الكود بالكامل.
      </p>

      <button
        onClick={() => router.push('/dashboard')}
        style={{
          background: '#00E5FF',
          color: '#001018',
          border: 'none',
          borderRadius: 16,
          padding: '18px 40px',
          fontSize: 20,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        ابدأ الآن مجانًا
      </button>
    </section>
  );
}
