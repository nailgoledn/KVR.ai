'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFoundingPartnerStats, ApiError } from '@/lib/api';
import { getAuthToken } from '@/lib/auth';
import type { FoundingPartnerStats } from '@/lib/types/founding-partner';

export default function PartnersDashboardPage() {
  const [stats, setStats] = useState<FoundingPartnerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getFoundingPartnerStats(token)
      .then(setStats)
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : 'فشل تحميل الإحصائيات');
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'إجمالي الطلبات', value: stats?.total ?? 0, href: '/admin/partners/new', color: '#00E5FF' },
    { label: 'طلبات جديدة', value: stats?.new ?? 0, href: '/admin/partners/new', color: '#38bdf8' },
    { label: 'تم التواصل', value: stats?.contacted ?? 0, href: '/admin/partners/contacted', color: '#a78bfa' },
    { label: 'موافق عليها', value: stats?.approved ?? 0, href: '/admin/partners/approved', color: '#34d399' },
    { label: 'مرفوضة', value: stats?.rejected ?? 0, href: '/admin/partners/new', color: '#f87171' },
    { label: 'مؤرشفة', value: stats?.archived ?? 0, href: '/admin/partners/archived', color: '#94a3b8' },
  ];

  return (
    <div>
      <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>Partners Dashboard</h1>
      <p style={{ color: '#64748b', margin: '0 0 32px' }}>
        نظرة عامة على طلبات الشركاء المؤسسين
      </p>

      {error && (
        <div
          style={{
            background: '#450a0a',
            border: '1px solid #ef4444',
            color: '#fecaca',
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: '#94a3b8' }}>⏳ جاري التحميل...</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: 12,
                padding: 24,
                textDecoration: 'none',
                color: '#fff',
              }}
            >
              <p style={{ color: '#64748b', margin: '0 0 8px', fontSize: 14 }}>
                {card.label}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 36,
                  fontWeight: 800,
                  color: card.color,
                }}
              >
                {card.value}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
