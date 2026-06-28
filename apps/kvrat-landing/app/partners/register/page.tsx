'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/src/components/layout/Navbar';
import { ApiError, registerFoundingPartner } from '@/lib/api';
import type { CreateFoundingPartnerPayload } from '@/lib/types/founding-partner';

const initialForm: CreateFoundingPartnerPayload = {
  companyName: '',
  fullName: '',
  country: '',
  city: '',
  phone: '',
  email: '',
  website: '',
  businessType: '',
  industry: '',
  products: '',
  message: '',
  preferredLanguage: 'ar',
  communicationMethod: 'email',
};

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: 12,
  borderRadius: 8,
  border: '1px solid #334155',
  background: '#111827',
  color: '#fff',
  fontSize: 15,
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#94a3b8',
  fontSize: 14,
  marginBottom: 6,
};

export default function PartnerRegisterPage() {
  const [form, setForm] = useState<CreateFoundingPartnerPayload>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const updateField = (
    field: keyof CreateFoundingPartnerPayload,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setValidationErrors([]);
    setSuccess(false);

    const payload: CreateFoundingPartnerPayload = {
      ...form,
      website: form.website?.trim() || undefined,
      products: form.products?.trim() || undefined,
      message: form.message?.trim() || undefined,
    };

    try {
      await registerFoundingPartner(payload);
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        if (err.details?.length) {
          setValidationErrors(err.details);
        }
      } else {
        setError('فشل إرسال الطلب — تأكد أن الخادم يعمل');
      }
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
          padding: '40px 24px',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Link
            href="/"
            style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14 }}
          >
            ← العودة للرئيسية
          </Link>

          <h1 style={{ margin: '24px 0 8px', fontSize: 32 }}>
            🤝 انضم كشريك مؤسس
          </h1>
          <p style={{ color: '#64748b', margin: '0 0 32px', lineHeight: 1.6 }}>
            املأ النموذج أدناه وسيتواصل معك فريق KVRAT.ai في أقرب وقت.
          </p>

          {success && (
            <div
              style={{
                background: '#052e16',
                border: '1px solid #22c55e',
                color: '#bbf7d0',
                padding: 16,
                borderRadius: 8,
                marginBottom: 24,
              }}
            >
              ✅ تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
            </div>
          )}

          {error && (
            <div
              style={{
                background: '#450a0a',
                border: '1px solid #ef4444',
                color: '#fecaca',
                padding: 16,
                borderRadius: 8,
                marginBottom: 24,
              }}
            >
              {error}
              {validationErrors.length > 0 && (
                <ul style={{ margin: '8px 0 0', paddingRight: 20 }}>
                  {validationErrors.map((msg) => (
                    <li key={msg}>{msg}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 16,
              padding: 32,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 20,
              }}
            >
              <div>
                <label style={labelStyle}>اسم الشركة *</label>
                <input
                  required
                  value={form.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  style={fieldStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>الاسم الكامل *</label>
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  style={fieldStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>الدولة *</label>
                <input
                  required
                  value={form.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  style={fieldStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>المدينة *</label>
                <input
                  required
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  style={fieldStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>الهاتف *</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  style={fieldStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>البريد الإلكتروني *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  style={fieldStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>الموقع الإلكتروني</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="https://"
                  style={fieldStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>نوع العمل *</label>
                <select
                  required
                  value={form.businessType}
                  onChange={(e) => updateField('businessType', e.target.value)}
                  style={fieldStyle}
                >
                  <option value="">اختر...</option>
                  <option value="manufacturer">مصنع</option>
                  <option value="distributor">موزّع</option>
                  <option value="retailer">تاجر تجزئة</option>
                  <option value="service">خدمات</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>القطاع / الصناعة *</label>
                <input
                  required
                  value={form.industry}
                  onChange={(e) => updateField('industry', e.target.value)}
                  style={fieldStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>اللغة المفضلة *</label>
                <select
                  required
                  value={form.preferredLanguage}
                  onChange={(e) =>
                    updateField('preferredLanguage', e.target.value)
                  }
                  style={fieldStyle}
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>طريقة التواصل المفضلة *</label>
                <select
                  required
                  value={form.communicationMethod}
                  onChange={(e) =>
                    updateField('communicationMethod', e.target.value)
                  }
                  style={fieldStyle}
                >
                  <option value="email">البريد الإلكتروني</option>
                  <option value="phone">الهاتف</option>
                  <option value="whatsapp">واتساب</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>المنتجات / الخدمات</label>
              <textarea
                value={form.products}
                onChange={(e) => updateField('products', e.target.value)}
                rows={3}
                style={{ ...fieldStyle, resize: 'vertical' }}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>رسالة إضافية</label>
              <textarea
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                rows={4}
                style={{ ...fieldStyle, resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 28,
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
              {loading ? '⏳ جاري الإرسال...' : 'إرسال الطلب'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
