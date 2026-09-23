'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function CreateAccount() {
  const [created, setCreated] = useState(false);

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
      <span className="eyebrow">مرحباً بك في فينيريا</span>
      <h1 style={{ fontSize: 40, margin: '14px 0 28px', lineHeight: 1.2 }}>إنشاء حساب</h1>
      <form
        className="card"
        dir="rtl"
        style={{ padding: 32, display: 'grid', gap: 20, direction: 'rtl', textAlign: 'right' }}
        onSubmit={(e) => {
          e.preventDefault();
          setCreated(true);
        }}
        id="create-account-form"
      >
        <label style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
          الاسم الكامل *
          <input
            required
            placeholder="فاطمة بن صالح"
            style={field}
            id="signup-name"
          />
        </label>
        <label style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
          البريد الإلكتروني *
          <input
            required
            type="email"
            placeholder="fatima@example.com"
            style={{ ...field, direction: 'ltr', textAlign: 'left' }}
            id="signup-email"
          />
        </label>
        <label style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
          كلمة المرور * (8 أحرف على الأقل)
          <input
            required
            minLength={8}
            type="password"
            style={field}
            id="signup-password"
          />
        </label>
        {created ? (
          <p style={{ color: 'var(--green)', fontWeight: 700, fontSize: 14, margin: 0 }}>
            ✅ تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.
          </p>
        ) : (
          <button
            type="submit"
            className="btn btn--primary"
            style={{ justifyContent: 'center' }}
            id="signup-submit"
          >
            إنشاء حسابي
          </button>
        )}
        <Link
          href="/login"
          style={{ color: 'var(--green)', textAlign: 'center', fontSize: 14, fontWeight: 600 }}
        >
          العودة إلى تسجيل الدخول
        </Link>
      </form>
    </main>
  );
}
