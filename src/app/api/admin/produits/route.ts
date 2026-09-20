import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validation';

export async function POST(request: Request) {
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({error:{code:'VALIDATION_ERROR',message:'Produit invalide',details:parsed.error.flatten()}},{status:422});
  const product = await prisma.product.create({data:{...parsed.data,imageUrl:parsed.data.imageUrl ?? null,published:false}});
  return NextResponse.json({product},{status:201});
}
