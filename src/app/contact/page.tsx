'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';

export default function Contact() {
  const [sent,setSent]=useState(false);
  const [error,setError]=useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)))});
    if (!response.ok) { setError('Impossible d\'envoyer le message.'); return; }
    setSent(true);
  }
  return <main className="container" style={{padding:'78px 0',maxWidth:1050}}><div style={{display:'grid',gridTemplateColumns:'.75fr 1.25fr',gap:70}}><div><span className="eyebrow">Parlons-nous</span><h1 style={{fontSize:54,lineHeight:1.05,margin:'16px 0'}}>Un projet en tete ?</h1><p style={{color:'var(--muted)',lineHeight:1.7}}>Ecrivez-nous quelques mots. Nous vous repondrons avec attention sous deux jours ouvrables.</p></div><form className="card" style={{padding:28,display:'grid',gap:16}} onSubmit={submit}><label>Nom<input required name="name" defaultValue="Camille Martin" style={field}/></label><label>Email<input required type="email" name="email" defaultValue="camille.martin@example.com" style={field}/></label><label>Sujet<input required name="subject" defaultValue="Projet d'amenagement" style={field}/></label><label>Message<textarea required name="message" defaultValue="Bonjour, je souhaite echanger au sujet d'une selection pour mon interieur." style={{...field,minHeight:120,resize:'vertical'}}/></label>{sent?<p style={{color:'var(--green)',fontWeight:700}}>Votre message a bien ete envoye.</p>:<button type="submit" style={{background:'var(--green)',color:'white',border:0,padding:'14px 18px',fontWeight:700,justifySelf:'start'}}>Envoyer le message <Send size={15} style={{verticalAlign:'middle'}}/></button>}{error&&<p role="alert">{error}</p>}</form></div></main>;
}
const field={display:'block',width:'100%',marginTop:7,padding:'12px',border:'1px solid var(--line)',borderRadius:6,background:'var(--cream)'};
