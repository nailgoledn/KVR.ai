'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/src/components/layout/Navbar';
import { generateBlueprint } from '@/lib/api';

function DashboardContent() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const idea = searchParams.get('idea');
    if (idea) setInput(idea);
  }, [searchParams]);

  const generate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const data = await generateBlueprint(input || 'Build an AI-powered SaaS platform');
      setResult(data);
    } catch {
      setResult({ error: 'Connection failed. Please ensure the backend is running on port 4000.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: '100vh',
          background: '#020617',
          color: '#fff',
          fontFamily: 'Arial, sans-serif',
          padding: 40,
        }}
      >
        <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>
          ← Back to Home
        </Link>

        <h1 style={{ marginTop: 24 }}>🧠 KVRAT AI Workspace</h1>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your startup idea here..."
          style={{
            padding: 12,
            width: '100%',
            maxWidth: 480,
            marginTop: 20,
            marginBottom: 12,
            borderRadius: 10,
            border: '1px solid #334155',
            background: '#111827',
            color: '#fff',
            fontSize: 16,
          }}
        />

        <br />

        <button
          onClick={generate}
          disabled={loading}
          style={{
            padding: '12px 24px',
            cursor: loading ? 'wait' : 'pointer',
            background: '#00E5FF',
            color: '#001018',
            border: 'none',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {loading ? '⏳ Generating...' : '🚀 Generate Blueprint'}
        </button>

        <hr style={{ marginTop: 32, borderColor: '#1e293b' }} />

        {result && (
          <pre
            style={{
              background: '#111',
              color: '#0f0',
              padding: 20,
              marginTop: 24,
              overflow: 'auto',
              borderRadius: 12,
              maxWidth: 900,
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </main>
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
