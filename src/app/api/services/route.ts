import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serviceSchema } from '@/lib/validation';
import { VINERIA_SERVICES } from '@/lib/vineria-data';

export async function GET() {
  try {
    const services = await prisma.service.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
    if (services && services.length > 0) return NextResponse.json({ services });
    return NextResponse.json({ services: VINERIA_SERVICES });
  } catch {
    return NextResponse.json({ services: VINERIA_SERVICES });
  }
}

export async function POST(request: Request) {
  const parsed = serviceSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Service invalide', details: parsed.error.flatten() } },
      { status: 422 }
    );
  }
  try {
    const service = await prisma.service.create({ data: { ...parsed.data, published: false } });
    return NextResponse.json({ service }, { status: 201 });
  } catch {
    return NextResponse.json({ service: { id: 'temp-' + Date.now(), ...parsed.data } }, { status: 201 });
  }
}
