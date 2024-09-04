// src/app/api/logout/route.ts
import { deleteSession } from '@/app/lib/session';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        await deleteSession();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Unexpected Error", error);
        return NextResponse.json({ errors: { general: 'An unexpected error occurred.' } }, { status: 500 });
    }
}