import Link from 'next/link';
import type { Service } from '@/types';
export function ServiceCard({service}:{service:Service}){ return <Link href={`/services/${service.slug}`} className="card" style={{display:'flex',flexDirection:'column',padding:22,minHeight:220}}><span className="eyebrow">{service.duration}</span><h3 style={{fontSize:22,margin:'24px 0 8px'}}>{service.name}</h3><p style={{color:'var(--muted)',fontSize:14,lineHeight:1.6,flex:1}}>{service.description}</p><span style={{color:'var(--green)',fontWeight:700}}>A partir de {service.priceFrom} EUR ↗</span></Link> }
