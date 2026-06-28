'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ApiError,
  deleteFoundingPartner,
  exportFoundingPartnersCsv,
  getFoundingPartners,
  updateFoundingPartner,
} from '@/lib/api';
import { getAuthToken } from '@/lib/auth';
import type {
  FoundingPartner,
  FoundingPartnerFilter,
  FoundingPartnerStatus,
} from '@/lib/types/founding-partner';
import {
  FOUNDING_PARTNER_STATUSES,
  STATUS_COLORS,
  STATUS_LABELS,
} from '@/lib/types/founding-partner';

interface PartnersTableProps {
  title: string;
  defaultStatus?: FoundingPartnerStatus;
}

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid #334155',
  background: '#111827',
  color: '#fff',
  fontSize: 14,
};

const thStyle: React.CSSProperties = {
  textAlign: 'right',
  padding: '12px 16px',
  borderBottom: '1px solid #1e293b',
  color: '#94a3b8',
  fontSize: 13,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  userSelect: 'none',
};

const tdStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid #1e293b',
  fontSize: 14,
  verticalAlign: 'top',
};

export default function PartnersTable({
  title,
  defaultStatus,
}: PartnersTableProps) {
  const [partners, setPartners] = useState<FoundingPartner[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);

  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [status, setStatus] = useState<FoundingPartnerStatus | ''>(
    defaultStatus ?? '',
  );
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [sortBy, setSortBy] = useState<
    FoundingPartnerFilter['sortBy']
  >('createdAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');

  const [countries, setCountries] = useState<string[]>([]);
  const [businessTypes, setBusinessTypes] = useState<string[]>([]);

  const buildFilter = useCallback((): FoundingPartnerFilter => {
    const filter: FoundingPartnerFilter = {
      page,
      limit,
      sortBy,
      sortOrder,
    };

    if (search.trim()) filter.search = search.trim();
    if (country) filter.country = country;
    if (businessType) filter.businessType = businessType;
    if (status) filter.status = status;

    return filter;
  }, [search, country, businessType, status, page, limit, sortBy, sortOrder]);

  const fetchPartners = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const result = await getFoundingPartners(token, buildFilter());
      setPartners(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);

      const uniqueCountries = [
        ...new Set(result.data.map((p) => p.country)),
      ].sort();
      const uniqueTypes = [
        ...new Set(result.data.map((p) => p.businessType)),
      ].sort();

      setCountries((prev) =>
        [...new Set([...prev, ...uniqueCountries])].sort(),
      );
      setBusinessTypes((prev) =>
        [...new Set([...prev, ...uniqueTypes])].sort(),
      );
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'فشل تحميل البيانات',
      );
    } finally {
      setLoading(false);
    }
  }, [buildFilter]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const handleSort = (column: FoundingPartnerFilter['sortBy']) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setSortBy(column);
      setSortOrder('DESC');
    }
    setPage(1);
  };

  const handleStatusChange = async (
    id: number,
    newStatus: FoundingPartnerStatus,
  ) => {
    const token = getAuthToken();
    if (!token) return;

    setActionId(id);
    try {
      await updateFoundingPartner(token, id, { status: newStatus });
      await fetchPartners();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'فشل تحديث الحالة',
      );
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

    const token = getAuthToken();
    if (!token) return;

    setActionId(id);
    try {
      await deleteFoundingPartner(token, id);
      await fetchPartners();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'فشل الحذف');
    } finally {
      setActionId(null);
    }
  };

  const handleExport = async () => {
    const token = getAuthToken();
    if (!token) return;

    setExporting(true);
    try {
      const blob = await exportFoundingPartnersCsv(token, buildFilter());
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'founding-partners.csv';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'فشل تصدير CSV',
      );
    } finally {
      setExporting(false);
    }
  };

  const sortIndicator = (column: FoundingPartnerFilter['sortBy']) => {
    if (sortBy !== column) return '';
    return sortOrder === 'ASC' ? ' ↑' : ' ↓';
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>{title}</h1>
          <p style={{ color: '#64748b', margin: 0 }}>
            {total} طلب — صفحة {page} من {totalPages}
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting || loading}
          style={{
            padding: '10px 20px',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: 8,
            color: '#00E5FF',
            cursor: exporting ? 'wait' : 'pointer',
            fontSize: 14,
          }}
        >
          {exporting ? '⏳ جاري التصدير...' : '⬇ تصدير CSV'}
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <input
          type="search"
          placeholder="بحث (شركة، اسم، بريد)..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={inputStyle}
        />
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setPage(1);
          }}
          style={inputStyle}
        >
          <option value="">كل الدول</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={businessType}
          onChange={(e) => {
            setBusinessType(e.target.value);
            setPage(1);
          }}
          style={inputStyle}
        >
          <option value="">كل أنواع الأعمال</option>
          {businessTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as FoundingPartnerStatus | '');
            setPage(1);
          }}
          style={inputStyle}
        >
          <option value="">كل الحالات</option>
          {FOUNDING_PARTNER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

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
      ) : partners.length === 0 ? (
        <p style={{ color: '#64748b' }}>لا توجد طلبات مطابقة.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: '#0f172a',
              borderRadius: 12,
              border: '1px solid #1e293b',
            }}
          >
            <thead>
              <tr>
                <th style={thStyle} onClick={() => handleSort('companyName')}>
                  الشركة{sortIndicator('companyName')}
                </th>
                <th style={thStyle} onClick={() => handleSort('fullName')}>
                  الاسم{sortIndicator('fullName')}
                </th>
                <th style={thStyle} onClick={() => handleSort('country')}>
                  الدولة{sortIndicator('country')}
                </th>
                <th style={thStyle}>المدينة</th>
                <th style={thStyle}>البريد / الهاتف</th>
                <th style={thStyle}>نوع العمل</th>
                <th style={thStyle} onClick={() => handleSort('status')}>
                  الحالة{sortIndicator('status')}
                </th>
                <th style={thStyle} onClick={() => handleSort('createdAt')}>
                  التاريخ{sortIndicator('createdAt')}
                </th>
                <th style={{ ...thStyle, cursor: 'default' }}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td style={tdStyle}>
                    <strong>{partner.companyName}</strong>
                    {partner.website && (
                      <div style={{ color: '#64748b', fontSize: 12 }}>
                        {partner.website}
                      </div>
                    )}
                  </td>
                  <td style={tdStyle}>{partner.fullName}</td>
                  <td style={tdStyle}>{partner.country}</td>
                  <td style={tdStyle}>{partner.city}</td>
                  <td style={tdStyle}>
                    <div>{partner.email}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>
                      {partner.phone}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div>{partner.businessType}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>
                      {partner.industry}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        background: `${STATUS_COLORS[partner.status]}22`,
                        color: STATUS_COLORS[partner.status],
                      }}
                    >
                      {STATUS_LABELS[partner.status]}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {new Date(partner.createdAt).toLocaleDateString('ar-SA')}
                  </td>
                  <td style={tdStyle}>
                    <select
                      value={partner.status}
                      disabled={actionId === partner.id}
                      onChange={(e) =>
                        handleStatusChange(
                          partner.id,
                          e.target.value as FoundingPartnerStatus,
                        )
                      }
                      style={{
                        ...inputStyle,
                        marginBottom: 6,
                        width: '100%',
                        minWidth: 120,
                      }}
                    >
                      {FOUNDING_PARTNER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelete(partner.id)}
                      disabled={actionId === partner.id}
                      style={{
                        padding: '4px 10px',
                        background: 'transparent',
                        border: '1px solid #ef4444',
                        borderRadius: 6,
                        color: '#f87171',
                        cursor: 'pointer',
                        fontSize: 12,
                        width: '100%',
                      }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginTop: 24,
          }}
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            style={{
              padding: '8px 16px',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: 8,
              color: '#fff',
              cursor: page <= 1 ? 'not-allowed' : 'pointer',
              opacity: page <= 1 ? 0.5 : 1,
            }}
          >
            السابق
          </button>
          <span style={{ color: '#94a3b8', padding: '8px 12px' }}>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            style={{
              padding: '8px 16px',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: 8,
              color: '#fff',
              cursor: page >= totalPages ? 'not-allowed' : 'pointer',
              opacity: page >= totalPages ? 0.5 : 1,
            }}
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}
