import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newProduct = await request.json();

        // Validate the newProduct object
        if (
            typeof newProduct.name !== 'string' ||
            typeof newProduct.description !== 'string' ||
            typeof newProduct.price !== 'number' ||
            !Array.isArray(newProduct.images) ||
            typeof newProduct.category !== 'string'
        ) {
            return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
        }

        const createdProduct = await prisma.product.create({
            data: {
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price,
                images: newProduct.images,
                category: newProduct.category,
            },
        });
        return NextResponse.json(createdProduct, { status: 201 });
    } catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}