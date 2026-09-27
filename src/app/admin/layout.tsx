import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="ltr" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          borderBottom: '1px solid var(--line)',
          background: 'var(--paper)',
          padding: '16px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/admin"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background:
                  'linear-gradient(140deg, var(--green-deep), var(--green-mid))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Leaf size={16} color="white" />
            </span>
            <span style={{ fontWeight: 800, color: 'var(--green-deep)' }}>
              VINERIA ADMIN
            </span>
          </Link>
          <nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link href="/admin" style={{ color: 'var(--ink)' }}>
              Tableau de bord
            </Link>
            <Link href="/admin/produits" style={{ color: 'var(--ink)' }}>
              Produits
            </Link>
            <Link href="/admin/services" style={{ color: 'var(--ink)' }}>
              Services
            </Link>
            <Link href="/admin/messages" style={{ color: 'var(--ink)' }}>
              Messages
            </Link>
            <Link
              href="/fr"
              style={{
                color: 'var(--green)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Voir le site &rarr;
            </Link>
          </nav>
        </div>
      </header>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
