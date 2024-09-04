// src/app/actions/auth.tsx
import { SignupFormSchema, FormState } from '@/app/lib/definitions';
import { createSession, deleteSession } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
var bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

export async function signup(data: { name: string; email: string; password: string }) {
    // 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse(data);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // 2. Prepare data for insertion into database
    const { name, email, password } = validatedFields.data;
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert the user into the database or call an Auth Library's API
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        };
    }

    // 4. Create user session
    await createSession(String(user.id));
    // 5. Redirect user
    return {success:true};
}

interface LoginParams {
    email: string;
    password: string;
}

export async function login({ email, password }: LoginParams) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return { errors: { email: 'User not found' } };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { errors: { password: 'Invalid password' } };
        }

        // Assuming you have a session management system
        await createSession(String(user.id));

        return { success: true };
    } catch (error) {
        console.error('Login error:', error);
        return { errors: { general: 'An unexpected error occurred' } };
    }
}