// src/app/api/signup/route.ts
import { signup } from '@/app/actions/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());

        const result = await signup(data as { name: string; email: string; password: string });

        if (result?.errors) {
            console.error("Signup Errors", result.errors);
            return NextResponse.json({ errors: result.errors }, { status: 400 });
        }

        if (result?.success) {
            console.log("Signup successful");
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ message: 'An error occurred while creating your account.' }, { status: 500 });
    } catch (error) {
        console.error("Unexpected Error", error);
        return NextResponse.json({ errors: { general: 'An unexpected error occurred.' } }, { status: 500 });
    }
}