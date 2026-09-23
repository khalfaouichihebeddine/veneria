import Link from 'next/link';
import { api } from '@/api';

export default async function Admin() {
  const [products, services, messages] = await Promise.all([
    api.getProducts(),
    api.getServices(),
    api.getMessages(),
  ]);

  const cards: [string, number, string][] = [
    ['المنتجات', products.length, '/admin/produits'],
    ['الخدمات', services.length, '/admin/services'],
    ['الرسائل', messages.length, '/admin/messages'],
  ];

  return (
    <main className="container" style={{ padding: '60px 0' }}>
      <span className="eyebrow">الفضاء الخاص</span>
      <h1 style={{ fontSize: 46, margin: '12px 0 35px' }}>مرحباً، مدير فينيريا.</h1>
      <div className="grid" style={{ marginBottom: 45 }}>
        {cards.map(([label, count, href]) => (
          <Link href={href} className="card" dir="rtl" style={{ padding: 22, direction: 'rtl', textAlign: 'right' }} key={label}>
            <span style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 600 }}>{label}</span>
            <strong style={{ display: 'block', fontSize: 38, marginTop: 12, color: 'var(--green)' }}>{count}</strong>
            <span style={{ color: 'var(--green)', fontSize: 13, fontWeight: 700 }}>إدارة</span>
          </Link>
        ))}
      </div>
      <h2 style={{ fontSize: 24, marginBottom: 14 }}>آخر الرسائل الواردة</h2>
      <div className="card" dir="rtl" style={{ direction: 'rtl', textAlign: 'right' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--line)',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <span>
              <strong>{message.name}</strong>
              <br />
              <small style={{ color: 'var(--muted)' }}>{message.subject}</small>
            </span>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>{message.status}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
