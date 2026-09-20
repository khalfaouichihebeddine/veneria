import { api } from '@/api';

export default async function AdminMessages() {
  const messages = await api.getMessages();
  return <main className="container" style={{padding:'60px 0'}}><span className="eyebrow">Administration</span><h1 style={{fontSize:42,margin:'12px 0 30px'}}>Messages recus</h1><div className="card">{messages.map((message)=><article key={message.id} style={{padding:22,borderBottom:'1px solid var(--line)'}}><div style={{display:'flex',justifyContent:'space-between'}}><strong>{message.name}</strong><span className="eyebrow">{message.status}</span></div><p style={{marginBottom:4}}>{message.subject}</p><small style={{color:'var(--muted)'}}>{message.email} · {new Date(message.createdAt).toLocaleDateString('fr-FR')}</small></article>)}</div></main>;
}
