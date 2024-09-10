// user/[userId]/favorites/[productId]

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { userId: string, productId: string } }) {
    const { userId, productId } = params;

    try {
        const favorite = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                favorites: {
                    connect: { id: parseInt(productId) },
                },
            },
        });

        return NextResponse.json(favorite, { status: 201 });
    } catch (error) {
        console.error('Error adding favorite:', error);
        return NextResponse.json({ errors: { general: 'An unexpected error occurred' } }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { userId: string, productId: string } }) {
    const { userId, productId } = params;

    try {
        const favorite = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                favorites: {
                    disconnect: { id: parseInt(productId) },
                },
            },
        });

        return NextResponse.json(favorite, { status: 200 });
    } catch (error) {
        console.error('Error removing favorite:', error);
        return NextResponse.json({ errors: { general: 'An unexpected error occurred' } }, { status: 500 });
    }
}