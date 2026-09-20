import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, {params}:{params:Promise<{id:string}>}) {
  const {id}=await params;
  const body=await request.json() as {name?:string;description?:string;duration?:string;priceFrom?:number;published?:boolean};
  const service=await prisma.service.update({where:{id},data:body});
  return NextResponse.json({service});
}
