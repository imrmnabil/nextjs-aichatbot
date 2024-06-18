import { NextRequest, NextResponse } from 'next/server';
import openaigen from '@/lib/openaigen';

export async function POST(req: NextRequest) {
    const body = await req.json()
    console.log(body)
    const res = { body: await openaigen(body)}
    return NextResponse.json(res);
}