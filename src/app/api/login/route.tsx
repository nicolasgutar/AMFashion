// src/app/api/login/route.ts
import { login } from '@/app/actions/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const result = await login({ email, password });

        if (result?.errors) {
            console.error("Login Errors", result.errors);
            return NextResponse.json({ errors: result.errors }, { status: 400 });
        }

        if (result?.success) {
            console.log("Login successful");
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ message: 'An error occurred while logging in.' }, { status: 500 });
    } catch (error) {
        console.error("Unexpected Error", error);
        return NextResponse.json({ errors: { general: 'An unexpected error occurred.' } }, { status: 500 });
    }
}