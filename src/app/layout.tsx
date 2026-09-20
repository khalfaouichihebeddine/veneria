import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
export const metadata: Metadata = { title:'Veneria — matieres choisies', description:'Objets, espaces et attentions singulieres.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <><SiteHeader />{children}<footer className="container" style={{padding:'42px 0',borderTop:'1px solid var(--line)',marginTop:80,color:'var(--muted)',fontSize:13,display:'flex',justifyContent:'space-between'}}><span>VENERIA / 2026</span><span>Objets choisis, espaces habites.</span></footer></>; }
