'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [idea, setIdea] = useState('');
  const router = useRouter();

  const goToDashboard = () => {
    const q = idea.trim() ? `?idea=${encodeURIComponent(idea.trim())}` : '';
    router.push(`/dashboard${q}`);
  };

  return (
    <section
      id="hero"
      style={{
        padding: '120px 40px',
        maxWidth: 1200,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: 24,
        }}
      >
        KVRAT.ai
      </h1>

      <p
        style={{
          fontSize: 24,
          color: '#94a3b8',
          maxWidth: 900,
          margin: '0 auto 50px',
          lineHeight: 1.7,
        }}
      >
        منصة ذكاء اصطناعي تحول فكرتك إلى مشروع متكامل يشمل
        <br />
        Backend و Frontend و API و Dashboard خلال دقائق.
      </p>

      <input
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="مثال: أنشئ منصة لإدارة موردي الإطارات"
        style={{
          width: '100%',
          maxWidth: 720,
          padding: 22,
          borderRadius: 16,
          border: '1px solid #334155',
          background: '#111827',
          color: '#fff',
          fontSize: 18,
          outline: 'none',
        }}
      />

      <div
        style={{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={goToDashboard}
          style={{
            background: '#00E5FF',
            color: '#001018',
            border: 'none',
            borderRadius: 14,
            padding: '18px 34px',
            fontSize: 18,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ابدأ الآن
        </button>

        <button
          onClick={() => {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            background: 'transparent',
            color: '#ffffff',
            border: '1px solid #475569',
            borderRadius: 14,
            padding: '18px 34px',
            fontSize: 18,
            cursor: 'pointer',
          }}
        >
          شاهد كيف يعمل
        </button>
      </div>
    </section>
  );
}
