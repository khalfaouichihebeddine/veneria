import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validation';
import { VINERIA_PRODUCTS } from '@/lib/vineria-data';

export async function GET() {
  try {
    const products = await prisma.product.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
    if (products && products.length > 0) return NextResponse.json({ products });
    return NextResponse.json({ products: VINERIA_PRODUCTS });
  } catch {
    return NextResponse.json({ products: VINERIA_PRODUCTS });
  }
}

export async function POST(request: Request) {
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Produit invalide', details: parsed.error.flatten() } },
      { status: 422 }
    );
  }
  try {
    const product = await prisma.product.create({
      data: { ...parsed.data, imageUrl: parsed.data.imageUrl ?? null, published: false },
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch {
    return NextResponse.json({ product: { id: 'temp-' + Date.now(), ...parsed.data } }, { status: 201 });
  }
}
