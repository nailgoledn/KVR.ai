'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearAuthToken, isAuthenticated } from '@/lib/auth';

const navItems = [
  { label: 'Dashboard', href: '/admin/partners', icon: '📊' },
  { label: 'New Requests', href: '/admin/partners/new', icon: '🆕' },
  { label: 'Approved', href: '/admin/partners/approved', icon: '✅' },
  { label: 'Contacted', href: '/admin/partners/contacted', icon: '📞' },
  { label: 'Archived', href: '/admin/partners/archived', icon: '📁' },
];

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/admin/login');
      return;
    }
    setReady(true);
  }, [router]);

  const handleLogout = () => {
    clearAuthToken();
    router.replace('/admin/login');
  };

  if (!ready) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#020617',
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ⏳ جاري التحقق...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#020617',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
      }}
    >
      <aside
        style={{
          width: 240,
          background: '#0f172a',
          borderLeft: '1px solid #1e293b',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <Link
            href="/"
            style={{
              color: '#00E5FF',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            KVRAT.ai
          </Link>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 13 }}>
            Admin — Partners
          </p>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 8,
                  marginBottom: 4,
                  textDecoration: 'none',
                  color: active ? '#00E5FF' : '#94a3b8',
                  background: active ? '#1e293b' : 'transparent',
                  fontWeight: active ? 600 : 400,
                  fontSize: 14,
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            padding: '10px 12px',
            background: 'transparent',
            border: '1px solid #334155',
            borderRadius: 8,
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: 14,
            textAlign: 'right',
          }}
        >
          🚪 تسجيل الخروج
        </button>
      </aside>

      <main style={{ flex: 1, padding: '32px 40px', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
