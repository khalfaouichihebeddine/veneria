import { NextResponse } from 'next/server'; export function GET(){ return NextResponse.json({user:{name:'Camille Martin',email:'camille.martin@example.com'}}); }
