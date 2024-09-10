import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        const Id = parseInt(id, 10); // Cast the id to an integer

        if (isNaN(Id)) {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: Id },
            select: { name: true, email: true },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}