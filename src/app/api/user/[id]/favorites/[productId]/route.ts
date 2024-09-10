// src/app/api/user/[userId]/favorites/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            include: { favorites: true },
        });

        if (!user) {
            return NextResponse.json({ errors: { user: 'User not found' } }, { status: 404 });
        }

        return NextResponse.json(user.favorites);
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        return NextResponse.json({ errors: { general: 'An unexpected error occurred' } }, { status: 500 });
    }
}