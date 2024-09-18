import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request:Request) {
    console.log("got into post");

    try {

        const { url, description, modelId } = await request.json();

        if (!url || !description || !modelId) {
            console.log("url", url);
            console.log("description", description);
            console.log("modelId", modelId);
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newImage = await prisma.image.create({
            data: {
                url,
                description,
                modelId: parseInt(modelId, 10),
            },
        });

        console.log(newImage);

        return NextResponse.json(newImage, { status: 201 });
    } catch (error) {
        console.error('Error adding image:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}