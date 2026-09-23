'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Metadata } from 'next';

export default function Login() {
  const [error, setError] = useState('');

  const field: React.CSSProperties = {
    display: 'block',
    width: '100%',
    marginTop: 7,
    padding: '12px 14px',
    border: '1px solid var(--line)',
    borderRadius: 8,
    background: 'var(--cream)',
    fontSize: 15,
    direction: 'rtl',
    textAlign: 'right',
  };

  return (
    <main className="container" style={{ padding: '100px 0', maxWidth: 520 }}>
      <span className="eyebrow">الفضاء الخاص</span>
      <h1 style={{ fontSize: 40, margin: '14px 0 28px', lineHeight: 1.2 }}>تسجيل الدخول</h1>
      <form
        className="card"
        dir="rtl"
        style={{ padding: 32, display: 'grid', gap: 20, direction: 'rtl', textAlign: 'right' }}
        onSubmit={(e) => {
          e.preventDefault();
          setError('تم تفعيل الدخول المحلي بنجاح.');
        }}
        id="login-form"
      >
        <label style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
          البريد الإلكتروني *
          <input
            required
            type="email"
            defaultValue="camille.martin@example.com"
            style={{ ...field, direction: 'ltr', textAlign: 'left' }}
            id="login-email"
          />
        </label>
        <label style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
          كلمة المرور *
          <input
            required
            type="password"
            defaultValue="password"
            style={field}
            id="login-password"
          />
        </label>
        {error && (
          <p style={{ color: 'var(--green)', fontWeight: 700, fontSize: 14, margin: 0 }}>{error}</p>
        )}
        <button
          type="submit"
          className="btn btn--primary"
          style={{ justifyContent: 'center' }}
          id="login-submit"
        >
          فتح جلستي
        </button>
        <Link
          href="/create-account"
          style={{ color: 'var(--green)', textAlign: 'center', fontSize: 14, fontWeight: 600 }}
        >
          إنشاء حساب جديد
        </Link>
      </form>
    </main>
  );
}
