import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const statusSchema=z.object({status:z.enum(['NEW','IN_PROGRESS','DONE'])});
export async function PATCH(request: Request, {params}:{params:Promise<{id:string}>}) {
  const parsed=statusSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({error:{code:'VALIDATION_ERROR',message:'Statut invalide',details:parsed.error.flatten()}},{status:422});
  const {id}=await params;
  try {
    const message=await prisma.contactMessage.update({where:{id},data:{status:parsed.data.status}});
    return NextResponse.json({message});
  } catch {
    return NextResponse.json({error:{code:'NOT_FOUND',message:'Message introuvable'}},{status:404});
  }
}
