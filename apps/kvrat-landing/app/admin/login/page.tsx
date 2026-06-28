'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ApiError, loginAdmin } from '@/lib/api';
import { isAuthenticated, setAuthToken } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin/partners');
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginAdmin(email, password);
      setAuthToken(result.access_token);
      router.push('/admin/partners');
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'فشل تسجيل الدخول — تحقق من البيانات',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#020617',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: 16,
          padding: 40,
        }}
      >
        <Link
          href="/"
          style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}
        >
          ← العودة للرئيسية
        </Link>

        <h1 style={{ margin: '24px 0 8px', fontSize: 28 }}>Admin Login</h1>
        <p style={{ color: '#64748b', margin: '0 0 32px' }}>
          تسجيل الدخول لإدارة طلبات الشركاء
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
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: 14,
              marginBottom: 6,
            }}
          >
            البريد الإلكتروني
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 16,
              borderRadius: 8,
              border: '1px solid #334155',
              background: '#111827',
              color: '#fff',
              fontSize: 16,
              boxSizing: 'border-box',
            }}
          />

          <label
            style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: 14,
              marginBottom: 6,
            }}
          >
            كلمة المرور
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 24,
              borderRadius: 8,
              border: '1px solid #334155',
              background: '#111827',
              color: '#fff',
              fontSize: 16,
              boxSizing: 'border-box',
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 14,
              background: '#00E5FF',
              color: '#001018',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 700,
              cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? '⏳ جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
