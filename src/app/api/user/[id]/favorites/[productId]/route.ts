import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { id: string, productId: string } }) {
    const userId = parseInt(params.id);
    const productId = parseInt(params.productId);

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                favorites: {
                    connect: { id: productId }
                }
            }
        });
        return NextResponse.json({ message: 'Product added to favorites' }, { status: 200 });
    } catch (error) {
        console.error('Error adding product to favorites:', error);
        return NextResponse.json({ error: 'Failed to add product to favorites' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string, productId: string } }) {
    const userId = parseInt(params.id);
    const productId = parseInt(params.productId);

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                favorites: {
                    disconnect: { id: productId }
                }
            }
        });
        return NextResponse.json({ message: 'Product removed from favorites' }, { status: 200 });
    } catch (error) {
        console.error('Error removing product from favorites:', error);
        return NextResponse.json({ error: 'Failed to remove product from favorites' }, { status: 500 });
    }
}