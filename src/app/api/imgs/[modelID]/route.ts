import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// In Next.js 13 App Router, use params instead of req.query
export async function GET(
    request: Request,
    { params }: { params: { modelID: string } }
) {
    const { modelID } = params;

    if (!modelID) {
        return NextResponse.json({ error: 'Model ID is required' }, { status: 400 });
    }

    try {
        const images = await prisma.image.findMany({
            where: {
                modelId: parseInt(modelID, 10),  // Ensure modelID is a number
            },
        });

        return NextResponse.json(images, { status: 200 });
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
