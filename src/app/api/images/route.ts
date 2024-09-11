import fs from 'fs';
import path from 'path';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export function GET(req: NextApiRequest) {
    const imagesDir = path.join(process.cwd(), 'public', 'models', 'alice');
    return new Promise((resolve) => {
        fs.readdir(imagesDir, (err, files) => {
            if (err) {
                resolve(NextResponse.json({ error: 'Error reading images directory' }, { status: 500 }));
                return;
            }
            const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/.test(file));
            resolve(NextResponse.json(imageFiles, { status: 200 }));
        });
    });
}