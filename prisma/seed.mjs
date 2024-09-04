import { PrismaClient } from '@prisma/client';
import productsData from '../src/data/products.json';

const prisma = new PrismaClient();

async function main() {
    for (const product of productsData) {
        await prisma.product.create({
            data: {
                name: product.name,
                category: product.category,
                description: product.description,
                price: product.price,
                images: product.images,
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });