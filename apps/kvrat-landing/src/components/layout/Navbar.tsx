'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        background: '#020617',
        borderBottom: '1px solid #1e293b',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <Link
        href="/"
        style={{
          color: '#00E5FF',
          fontSize: 22,
          fontWeight: 800,
          textDecoration: 'none',
        }}
      >
        KVRAT.ai
      </Link>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Link href="/#features" style={linkStyle}>
          الميزات
        </Link>
        <Link href="/#how-it-works" style={linkStyle}>
          كيف يعمل
        </Link>
        <Link
          href="/dashboard"
          style={{
            ...linkStyle,
            background: '#00E5FF',
            color: '#001018',
            padding: '10px 20px',
            borderRadius: 10,
            fontWeight: 700,
          }}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

const linkStyle: React.CSSProperties = {
  color: '#cbd5e1',
  textDecoration: 'none',
  fontSize: 15,
};
