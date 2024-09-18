import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
    const { date, location, participatingModels, productsShowcase } = await req.json();
    const event = await prisma.event.create({
        data: {
            date: new Date(date),
            location,
            participatingModels,
            productsShowcase,
        },
    });
    return NextResponse.json(event, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const { id, date, location, participatingModels, productsShowcase } = await req.json();
    const event = await prisma.event.update({
        where: { id: parseInt(id) },
        data: {
            date: new Date(date),
            location,
            participatingModels,
            productsShowcase,
        },
    });
    return NextResponse.json(event);
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    try {
        await prisma.event.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: 'Event deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting event' }, { status: 500 });
    }
}