// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const models = await prisma.model.findMany();
        return NextResponse.json(models, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, contact, bio } = await request.json();
        const newModel = await prisma.model.create({
            data: {
                name,
                contact,
                bio,
            },
        });
        return NextResponse.json(newModel, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create model' }, { status: 500 });
    }
}