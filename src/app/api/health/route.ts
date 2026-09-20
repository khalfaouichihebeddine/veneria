import { NextResponse } from 'next/server';
export function GET(){ return NextResponse.json({status:'healthy',services:{web:'healthy',database:process.env.DATABASE_URL?'configured':'not-configured'}}); }
