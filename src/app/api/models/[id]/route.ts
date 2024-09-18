import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const deletedModel = await prisma.model.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json(deletedModel, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete model' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const model = await prisma.model.findUnique({
            where: { id: Number(id) },
        });
        if (model) {
            return NextResponse.json(model, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch model' }, { status: 500 });
    }
}