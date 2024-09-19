import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const deletedProduct = await prisma.product.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json(deletedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}