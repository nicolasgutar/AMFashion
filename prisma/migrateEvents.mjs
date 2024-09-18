// migrateEvents.ts
import { PrismaClient } from '@prisma/client';
import eventsData from '../src/data/events.json' assert {type:'json'};
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {

    for (const event of eventsData) {
        await prisma.event.create({
            data: {
                date: new Date(event.date),
                location: event.location,
                participatingModels: event.participatingModels,
                productsShowcase: event.productsShowcase,
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