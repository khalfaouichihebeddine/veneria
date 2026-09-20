import Link from 'next/link';
import { api } from '@/api';

export default async function Admin() {
  const [products, services, messages] = await Promise.all([api.getProducts(), api.getServices(), api.getMessages()]);
  const cards = [['Produits', products.length, '/admin/produits'], ['Services', services.length, '/admin/services'], ['Messages', messages.length, '/admin/messages']];
  return <main className="container" style={{padding:'60px 0'}}><span className="eyebrow">Espace prive</span><h1 style={{fontSize:46,margin:'12px 0 35px'}}>Bonjour, Camille.</h1><div className="grid" style={{marginBottom:45}}>{cards.map(([label,count,href])=><Link href={href as string} className="card" style={{padding:22}} key={label as string}><span style={{color:'var(--muted)'}}>{label}</span><strong style={{display:'block',fontSize:38,marginTop:12}}>{count}</strong><span style={{color:'var(--green)',fontSize:13}}>Gerer</span></Link>)}</div><h2 style={{fontSize:24}}>Messages recents</h2><div className="card" style={{marginTop:14}}>{messages.map((message)=><div key={message.id} style={{padding:'16px 20px',borderBottom:'1px solid var(--line)',display:'flex',justifyContent:'space-between',gap:20}}><span><strong>{message.name}</strong><br/><small style={{color:'var(--muted)'}}>{message.subject}</small></span><span style={{color:'var(--muted)',fontSize:13}}>{message.status}</span></div>)}</div></main>;
}
