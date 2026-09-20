import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
export function ProductCard({product}:{product:Product}){ return <Link href={`/produits/${product.slug}`} className="card" style={{display:'block',transition:'transform .2s'}}>{product.imageUrl&&<Image src={product.imageUrl} alt={product.name} width={600} height={440} style={{width:'100%',height:220,objectFit:'cover'}}/>}<div style={{padding:18}}><div style={{display:'flex',justifyContent:'space-between',gap:10}}><h3 style={{margin:0,fontSize:19}}>{product.name}</h3><span style={{color:'var(--ochre)'}}>{product.price} EUR</span></div><p style={{color:'var(--muted)',fontSize:14,lineHeight:1.5}}>{product.description}</p></div></Link> }
